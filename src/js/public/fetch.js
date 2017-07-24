let defaultOption = {
	headers: {
    	'fetch': '1'
    }
};

(function(self) {
	self.fetch = function(url,option){	
		var opt = JSON.parse(JSON.stringify(defaultOption));	
		for(var p in option){
			opt[p] = option[p];
		}
		/** 获取token **/
		if(opt.method && opt.method.toUpperCase() =='POST'){
			let _token = document.getElementById('_token').value;	

			if(!opt.body){
				/** 如果头部有申明是json格式 **/
				if(opt.headers && opt.headers['Content-Type'] && opt.headers['Content-Type'].contains('application/json')){ 
					opt.body = JSON.stringify({});
				}else{ /* 默认为FormData */
					(opt.body = new FormData());
				}
			}
			if(opt.body instanceof  FormData){
		 		opt.body.append('_token',_token)
		 	}else{
		 		let body =  JSON.parse(opt.body);
		 		body['_token'] = _token;
		 		opt.body = JSON.stringify(body);	
		 	} 
					
		}	
		return wFetch(url,opt).then(function(response){	
			/** 401注销 **/		
			if(response.status === 401 ){				
				window.location.href =  '/logout';
				throw Error();
			}
			return response;
		});
	}	
})(typeof self !== 'undefined' ? self : this);


	

