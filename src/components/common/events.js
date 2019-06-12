import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import mappings from './mappings.js'
export function EventCatalog(conn){
    this.Socket = null;
    this.Sync = function(startBlock, endBlock, filter, cbTx){
        if(this.Socket){
            this.Socket.disconnect();
        }
        this.Socket = socketIOClient(conn);
        this.Socket.on('connect', (msg) => {
            this.Socket.emit('sync', startBlock);        
        })
        this.Socket.on('event', (msg) => {
            if('Last' == endBlock || msg.block <= endBlock){
                let tx = JSON.parse(msg.transaction)
                if(relay(tx,filter)){
                    let tx_mapped = {}
                    Object.keys(tx).forEach(
                        (col)=>
                        {
                            let key = (mappings[col]!='undefined' ? mappings[col]:col);
                            let val = tx[col];
                            tx_mapped[key] = val;
                        })
                    msg.transaction = tx_mapped
                    cbTx(msg); 
                }
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