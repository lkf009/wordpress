
/*
 * action 类型
 */
/* 开启消息框 */
const ONPOPUP_TODO = 'ONPOPUP_TODO';
/*主页初始化加载*/
const HOMEINIT_TODO = 'HOMEINIT_TODO';

export {
    ONPOPUP_TODO,
    HOMEINIT_TODO
};

/*
 * action 创建函数
 */

/* 开启消息框 */
function onPopup(content){
    return { type : ONPOPUP_TODO, content : content };
}

/*主页初始化加载*/
function homeInit(state){
    return { type : HOMEINIT_TODO, state : state };
}

function fetchHomeInit(){
    return dispatch => {
        let timestamp = (new Date()).getTime();
        let url = '/ajax/init?t=' + timestamp;
        fetch(url, {credentials: 'include'}).then((response)=>{
            return response.json()
        }).then((result)=>{
            if(result.status){
                let state = {
                    user : result.user
                };
                dispatch(homeInit(state));
            }else{
            }
        }).catch((ex) => {
            console.log(ex);
        });
    };
}

export {
    onPopup,
    homeInit,
    fetchHomeInit
};
