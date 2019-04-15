import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import mappings from './mappings.js'
export function EventCatalog(conn){
    this.Socket = null;
    this.Sync = function(block, filter, cb){
        this.Events = {}
        this.Recorders = {}
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
                            this.Events[val] = this.Events[val]===undefined ? 1 : this.Events[val]+1                
                        }
                        if(key=='Recorder'){
                            this.Recorders[val] = this.Recorders[val]===undefined ? 1 : this.Recorders[val]+1                
                        }
                    })
                msg.transaction = tx_mapped;
                cb(msg,this.Events, this.Recorders);    
            }
        });    
    }
    function relay(t,filters){
        var tx = Object.values(t);
        var send = true;
        if(filters.length>0){
            filters.forEach((c)=>{
                console.log('filter ['+c + ']');
                if(c!='' && !tx.includes(c)){
                    send = false;
                }            
            });
        }
        return send;
    }
}
export default EventCatalog