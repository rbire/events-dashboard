import axios from 'axios'
export function Ledger(conn){
    this.queryTest = function(callback){
    	axios.get(conn + 'api/').then(response=>{
			callback(response.data)
		});
	}
    this.queryAllEvents = function(query,callback){
    	axios.get(conn + 'get_all_events/' + query).then(response=>{
			callback(response.data)
		});
	}
	this.queryEvents = function(id, callback){
    	axios.get(conn + 'get_event/' + id).then(response=>{
			callback(response.data)
		});
	}
	this.queryEventHistory = function(id, callback){
    	axios.get(conn + 'get_event_history/' + id).then(response=>{
			callback(response.data)
		});
	}
	this.recordEvents = function(data, callback){
		var record = 
		  data.arg_0 + "|" 
		+ data.arg_1 + "|" 
		+ data.arg_2 + "|" 
		+ data.arg_3 + "|" 
		+ data.arg_4 + "|" 
		+ data.arg_5 + "|" 
		+ data.arg_6 + "|" 
		+ data.arg_7 + "|" 
		+ data.arg_8 + "|" 
		+ data.arg_9;
    	axios.get(conn + 'add_event/' + record).then(response=>{
			callback(response.data)
		});        
	}
}
export default Ledger;