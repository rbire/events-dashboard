import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import mappings from './mappings.js'
export function EventCatalog(conn){
    this.Counts = {}
    this.Data = [];
    this.Socket = null;
    this.Sync = function(block, filter, cb){
        this.Counts = {};
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
                        if(key=='Event'){
                            this.Counts[val] = this.Counts[val]===undefined ? 1 : this.Counts[val]+1                
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
                if(!tx.includes(c)){
                    send = false;
                }            
            });
        }
        return send;
    }
}
export default EventCatalog