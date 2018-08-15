import Mock from "mockjs";
export default {
    queryNews: () => {
        return Mock.mock({
            success: true,
            message: true,
            total: 100,
            "list|10": [
                {
                    "id|+1": 1,
                    "name|1": ["新闻的标题1", "新闻的标题2"],
                    category: "新闻的分类",
                    "publishTime|1": [
                        "2018-10-10 10:10:20",
                        "2015-09-09 09:09:09"
                    ],
                    "publishMan|1": ["系统管理员", "国家领导人"],
                    "clickRate|1": ["100", "200"],
                    "status|1": [0, 1, 2, 3],
                    coverMap:
                        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533747132541&di=4a7d4ae6e9bd3068ad1b9a65ae75e235&imgtype=0&src=http%3A%2F%2Fimg1b.xgo-img.com.cn%2Fpics%2F1532%2F1531932.jpg"
                }
            ]
        });
    },
    upload: () => {
        return Mock.mock({
            success: true,
            message: true,
            data: {
                url:
                    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533747132541&di=4a7d4ae6e9bd3068ad1b9a65ae75e235&imgtype=0&src=http%3A%2F%2Fimg1b.xgo-img.com.cn%2Fpics%2F1532%2F1531932.jpg"
            }
        });
    }
};
