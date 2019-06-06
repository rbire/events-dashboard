import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import mappings from './mappings.js'
export function EventCatalog(conn){
    this.trigger=null;
    this.Socket = null;
    this.Sync = function(block, filter, cbTx,cbCount){
        this.Counts ={
            Events:[],
            Recorders:[],
            Entities:[],
            Dates:[],
            Hours:[],
            Subjects:[],
        }
        if(this.Socket){
            this.Socket.disconnect();
        }
        this.Socket = socketIOClient(conn);
        this.Socket.on('connect', (msg) => {
            this.Socket.emit('sync', block);        
        })
        this.Socket.on('event', (msg) => {
            let tx = JSON.parse(msg.transaction)
            if(relay(tx,filter)){
                let tx_mapped = {}
                Object.keys(tx).forEach(
                    (col)=>
                    {
                        let key = (mappings[col]!='undefined' ? mappings[col]:col);
                        let val = tx[col];
                        tx_mapped[key] = val;
                        if(key==='Event'){
                            update(val,this.Counts.Events)               
                        }
                        if(key==='Recorder'){
                            update(val,this.Counts.Recorders)            
                        }
                        if(key==='Entity'){
                            update(val,this.Counts.Entities);
                        }
                        if(key==='Subject'){
                            update(val,this.Counts.Subjects);
                        }
                        if(key==='DateTime'){
                            let date = new Date(val);
                            var hk = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();//date.getMonth()+'/'+date.getDate()+' '+date.getHours();
                            update(hk,this.Counts.Hours);
                            var dk = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
                            update(dk,this.Counts.Dates);
                        }
                    })
                msg.transaction = tx_mapped;
                cbTx(msg); 
                clearTimeout(this.trigger);
                this.trigger = setTimeout(function(){
                    cbCount(Object.assign({}, this.Counts)); 
                }.bind(this),10);           
            }
        });    
    }

    function update(key, counts){
        let pos = find(key,counts);
        if(pos!=-1){
            counts[pos].events+=1;
        }else{
            counts.push({
                name:key, events:1
            })
        }
    }

    function find(name, counts){
        for(var i=0;i<counts.length;i++)
        {
            if(counts[i].name==name){
                return i;
            }
        }
        return -1;
    }

    function relay(t,filters){
        var tx = Object.values(t);
        var send = true;
        if(filters.length>0){
            filters.forEach((c)=>{
                if(c!='' && !tx.includes(c)){
                    send = false;
                }            
            });
        }
        return send;
    }
}
export default EventCatalog