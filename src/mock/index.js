const Mock = require("mockjs");
let data = Mock.mock({
  "data|100": [
    //生成xxx条数据 数组
    {
      "messageID|+1": 1, //生成id，自增1
      messageTitle: "@ctitle(3,7)", //生成消息标题，长度为10个汉字
      shopName: "@cname", //生成商品名 ， 都是中国人的名字
      messageTel: /^1(5|3|7|8)[0-9]{9}$/, //生成随机电话号
      messageData: "@date('yyyy-MM-dd')", //生成随机发布时间
      shopAddress: "@county(true)", //随机生成地址
      "shopStar|1-5": "★", //随机生成1-5个星星
      "salesVolume|30-1000": 30, //随机生成商品价格 在30-1000之间
      shopLogo: "@Image('100x40','#c33', '#ffffff','小北鼻')", //生成随机图片，大小/背景色/字体颜色/文字信息
      "food|2": [
        //每个商品中再随机生成2个food
        {
          foodName: "@cname", //food的名字
          foodPic: "@Image('100x40','#c33', '#ffffff','小可爱')", //生成随机图片，大小/背景色/字体颜色/文字信息
          "foodPrice|1-100": 20, //生成1-100的随机数
          "aname|2": [
            {
              aname: "@cname",
              "aprice|30-60": 20,
            },
          ],
        },
      ],
    },
  ],
});
Mock.mock(/goods\/goodAll/, "post", () => {
  //三个参数。第一个：路径，第二个：请求方式post/get，第三个：回调，返回值
  return data;
});

// list 分页接口()

Mock.mock("http://localhost:8080/api/list", "post", (params) => {
  var info = JSON.parse(params.body);

  var [index, size, total] = [info.pageIndex, info.pageSize, dataList.length];

  var len = total / size;

  var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len;

  var newDataList = dataList.slice(index * size, (index + 1) * size);

  return {
    code: "0",

    message: "success",

    data: {
      pageIndex: index,

      pageSize: size,

      rows: newDataList,

      total: total,

      totalPages: totalPages,
    },
  };
});

// app用户列表
let usersList = Mock.mock({
  "data|100": [
    {
      "userId|+1": 1, //编号
      number: /[A-Z]*[0-9]{10}$/, //账号
      name: "@cname", //真实姓名
      phoneNumber: /^1(5|3|7|8)[0-9]{9}$/, //手机号
      adress: "@csentence", //详细地址
      "status|1": ["0", "1"], //状态
      registerTime: "@datetime('yyyy-MM-dd HH:mm:ss')", //注册时间
      verifiedTime: "@datetime('yyyy-MM-dd HH:mm:ss')", //实名时间
    },
  ],
});
// 分页获取
Mock.mock("/user/list", "post", (params) => {
  let body = JSON.parse(params.body);
  let { pageIndex, pageSize, queryParams, dateRange } = body;
  let newList = usersList.data;
  if (newList.length > 0 && queryParams.userId) {
    newList = newList.filter((res) => {
      return res.userId == queryParams.userId;
    });
  }
  if (newList.length > 0 && queryParams.phoneNumber) {
    newList = newList.filter((res) => {
      return res.phoneNumber == queryParams.phoneNumber;
    });
  }
  if (newList.length > 0 && queryParams.status) {
    newList = newList.filter((res) => {
      return res.status == queryParams.status;
    });
  }
  if (newList.length > 0 && dateRange.length > 0) {
    newList = newList.filter((res) => {
      return (
        res.registerTime >= dateRange[0] && res.registerTime <= dateRange[1]
      );
    });
  }
  let total = newList.length;
  let len = total / pageSize;
  let totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len;
  let newDataList = newList.slice(
    (pageIndex - 1) * pageSize,
    pageIndex * pageSize
  );
  return {
    code: 200,
    message: "success",
    data: {
      pageIndex,
      pageSize,
      userList: newDataList,
      total,
      totalPages: totalPages,
    },
  };
});

// 公告列表
let noticeList = Mock.mock({
  "data|100": [
    {
      "noticeId|+1": 1, //编号
      noticeTitle: "@ctitle", //公告标题
      noticeContent: "@cparagraph(20)", //公告内容
      createTime: "@datetime('yyyy-MM-dd HH:mm:ss')", //发布时间
    },
  ],
});
// 分页获取
Mock.mock("/notice/list", "post", (params) => {
  let body = JSON.parse(params.body);
  let { pageIndex, pageSize, queryParams } = body;
  let newList = noticeList.data;
  if (newList.length > 0 && queryParams.noticeTitle) {
    newList = newList.filter((res) => {
      return res.noticeTitle == queryParams.noticeTitle;
    });
  }
  if (newList.length > 0 && queryParams.dateRange.length > 0) {
    newList = newList.filter((res) => {
      return (
        res.createTime >= queryParams.dateRange[0] &&
        res.createTime <= queryParams.dateRange[1]
      );
    });
  }
  let total = newList.length;
  let len = total / pageSize;
  let totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len;
  let newDataList = newList.slice(
    (pageIndex - 1) * pageSize,
    pageIndex * pageSize
  );
  return {
    code: 200,
    message: "success",
    data: {
      pageIndex,
      pageSize,
      noticeList: newDataList,
      total,
      totalPages: totalPages,
    },
  };
});
// 删除公告
Mock.mock("/notice/delete", "post", (params) => {
  let body = JSON.parse(params.body);
  let { id } = body;
  noticeList.data = noticeList.data.filter((res) => {
    return res.noticeId != id;
  });
  return {
    code: 200,
    message: "success",
  };
});

// 订单列表mock数据模拟
let ordersList = Mock.mock({
  "data|100": [
    {
      "oId|+1": 1, //ID
      oNumber: /[A-Z]*[0-9]{10}$/, //订单编号
      collectionsNumber: "@cname", //藏品套系ID
      collectionNumber: /^1(5|3|7|8)[0-9]{9}$/, //藏品ID
      number: /[0-9]{10}$/, //账号
      oName: "@cname", //名称
      buyNumber: /[0-9]{2}$/, // 购买数量
      lssuerName: "@cname", // 发行方名称
      payTime: "@datetime('yyyy-MM-dd HH:mm:ss')", //支付时间
      "orderType|1": ["0", "1"], // 订单类型
    },
  ],
});

// 订单列表查询，分页功能实现
Mock.mock("/order/list", "post", (params) => {
  let body = JSON.parse(params.body);
  let { pageIndex, pageSize, queryParams, dateRange } = body;
  let newList = ordersList.data;

  if (newList.length > 0 && queryParams.number) {
    newList = newList.filter((res) => {
      return res.number == queryParams.number;
    });
  }

  if (newList.length > 0 && queryParams.oNumber) {
    newList = newList.filter((res) => {
      return res.oNumber == queryParams.oNumber;
    });
  }

  if (newList.length > 0 && queryParams.oName) {
    newList = newList.filter((res) => {
      return res.oName == queryParams.oName;
    });
  }

  if (newList.length > 0 && queryParams.lssuerName) {
    newList = newList.filter((res) => {
      return res.lssuerName == queryParams.lssuerName;
    });
  }

  if (newList.length > 0 && queryParams.collectionsNumber) {
    newList = newList.filter((res) => {
      return res.collectionsNumber == queryParams.collectionsNumber;
    });
  }

  if (newList.length > 0 && queryParams.collectionNumber) {
    newList = newList.filter((res) => {
      return res.collectionNumber == queryParams.collectionNumber;
    });
  }

  if (newList.length > 0 && queryParams.orderType) {
    newList = newList.filter((res) => {
      return res.orderType == queryParams.orderType;
    });
  }
  if (newList.length > 0 && dateRange.length > 0) {
    newList = newList.filter((res) => {
      return res.payTime >= dateRange[0] && res.payTime <= dateRange[1];
    });
  }
  let total = newList.length;
  let len = total / pageSize;
  let totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len;
  let newDataList = newList.slice(
    (pageIndex - 1) * pageSize,
    pageIndex * pageSize
  );
  return {
    code: 200,
    message: "success",
    data: {
      pageIndex,
      pageSize,
      userList: newDataList,
      total,
      totalPages: totalPages,
    },
  };
});
// 订单删除
Mock.mock("/order/delete", "post", (params) => {
  let body = JSON.parse(params.body);
  let { id } = body;
  ordersList.data = ordersList.data.filter((res) => {
    return res.oId != id;
  });
  return {
    code: 200,
    message: "success",
  };
});

// 发行方管理
let issuerList = Mock.mock({
  "data|100": [
    {
      "issuerID|+1": 1, //编号
      issuerName: "@ctitle", //发行方名称
      contact: "@cname", //联系人
      phone: /^1(5|3|7|8)[0-9]{9}$/, //电话号码
      email: "@email", //电子邮件
      address: "@csentence", //详细地址
      remarks: "@cparagraph(10)", //备注
      avatar() {
        return Mock.Random.image(
          "50×50",
          Mock.Random.color(),
          "#757575",
          "png",
          this.issuerName
        );
      },
    },
  ],
});
// 分页获取
Mock.mock("/issuer/list", "post", (params) => {
  let body = JSON.parse(params.body);
  let { pageIndex, pageSize, queryParams } = body;
  let newList = issuerList.data;
  if (newList.length > 0 && queryParams.issuerID) {
    newList = newList.filter((res) => {
      return res.issuerID == queryParams.issuerID;
    });
  }
  if (newList.length > 0 && queryParams.issuerName) {
    newList = newList.filter((res) => {
      return res.issuerName == queryParams.issuerName;
    });
  }
  let total = newList.length;
  let len = total / pageSize;
  let totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len;
  let newDataList = newList.slice(
    (pageIndex - 1) * pageSize,
    pageIndex * pageSize
  );
  return {
    code: 200,
    message: "success",
    data: {
      pageIndex,
      pageSize,
      issuerList: newDataList,
      total,
      totalPages: totalPages,
    },
  };
});
// 删除
Mock.mock("/issuer/delete", "post", (params) => {
  let body = JSON.parse(params.body);
  let { id } = body;
  issuerList.data = issuerList.data.filter((res) => {
    return res.issuerID != id;
  });
  return {
    code: 200,
    message: "success",
  };
});
// 修改
Mock.mock("/issuer/update", "post", (params) => {
  let body = JSON.parse(params.body);
  let { issuerData } = body;
  function findIndex(id){
    for(let i=0; i<issuerList.data.length; i++){
      if(issuerList.data[i].issuerID == id)
        return i;
    }
    return -1;
  }
  let index = findIndex(issuerData.issuerID);
  issuerList.data[index] = issuerData;
  // console.log("修改后",issuerList.data[index]);
  return {
    code: 200,
    message: "success",
  };
});

// 新增
Mock.mock("/issuer/create", "post", (params) => {
  const body = JSON.parse(params.body);
  const { name, user, phone, email, address, avatar, remarks } = body;
  return {
    code: 200,
    message: "success",
  };
});

// 上传头像
Mock.mock("/upload/avatar", "post", (params) => {
  return {
    code: 200,
    message: "success",
  };
});
