import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import mappings from './mappings.js'
export function EventCatalog(conn){
    this.Socket = null;
    this.Sync = function(block, filter, cb){
        this.Counts ={
            Events:{},
            Recorders:{},
            Entities:{},
            Dates:{}
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
                            this.Counts.Events[val] = this.Counts.Events[val]===undefined ? 1 : this.Counts.Events[val]+1                
                        }
                        if(key==='Recorder'){
                            this.Counts.Recorders[val] = this.Counts.Recorders[val]===undefined ? 1 : this.Counts.Recorders[val]+1                
                        }
                        if(key==='Entity'){
                            this.Counts.Entities[val] = this.Counts.Entities[val]===undefined ? 1 : this.Counts.Entities[val]+1                
                        }
                        if(key==='DateTime'){
                            let date = new Date(val);
                            var k = date.getMonth()+'/'+date.getDate()+' '+date.getHours();
                            this.Counts.Dates[k] = this.Counts.Dates[k]===undefined ? 1 : this.Counts.Dates[k]+1  
                        }
                    })
                msg.transaction = tx_mapped;
                cb(msg,this.Counts);    
            }
        });    
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