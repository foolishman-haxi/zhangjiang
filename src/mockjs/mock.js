//引入mokejs
const Mock = require("mockjs");
//获取mock.Random对象
const Random = Mock.Random;

// 模拟数据，包括ID，名称，创建时间，展示时间，藏品数量，状态
const data = function () {
    let datalist = [];
    for (let i = 0; i < 34; i++){
        let dataObject = {
            id: i,
            name: Random.cname(),
            setTime: Random.datetime(),
            endTime: Random.datetime(),
            amount: Random.natural(1,100),
            state:Random.boolean(),
        }
        datalist.push(dataObject);
    }
    return datalist;
    
}
Mock.mock('http://localhost/#/serieslist',data)


