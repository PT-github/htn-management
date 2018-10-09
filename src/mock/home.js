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
    queryCertificate: () => {
        return Mock.mock({
            success: true,
            message: true,
            total: 100,
            "list|10": [
                {
                "id|+1": 1,
                "username|1": ["张三", "李四", "王五"],
                "sex|1": ['男', '女'],
                "certId|1": ["430XXXXXXXXXXXXX", "520XXXXXXXXXXXXXXX"],
                "birth|1": ["2011-03-19", "2012-10-08"],
                "imgUrl|1" : ["http://www.hnjkfwy.com/upload/day_180520/201805201139129214.jpg", "http://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1527600577&di=a49676be1b756f35b8e3ab3cb4585143&imgtype=jpg&src=http%3A%2F%2Fimg6.bdstatic.com%2Fimg%2Fimage%2Fpublic%2Fwuqiuhuang.jpg"],
                "cerType": "岗位能力培训证书",
                "cerName": "中医康复理疗",
                "cerNo": "xxxxxxxxxxxxxx",
                "cerLevel": "高级",
                "cerReport": "合格",
                "education": "大专",
                "getCerTime": "2016-10-09",
                "issuingAgency": "国家卫生计生委能力剑圣和继续教育中心，中国健康促进基金会",
                "remark": "《健康服务业岗位能力培新合格证书》XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                }
            ]
        });
    },
    queryTeacher: () => {
        return Mock.mock({
            'success': true,
            "message": '成功',
            "total": 500,
            "list|10": [
                {
                    "id|+1": 1,
                    "name|1": ["张三", "李四", "王五"],
                    "imgUrl|1": ["http://www.hnjkfwy.com/upload/day_180520/201805201139129214.jpg", "http://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1527600577&di=a49676be1b756f35b8e3ab3cb4585143&imgtype=jpg&src=http%3A%2F%2Fimg6.bdstatic.com%2Fimg%2Fimage%2Fpublic%2Fwuqiuhuang.jpg"],
                    "subject|1": ["学科一", "学科二", "学科三", "学科四", "学科五"],
                    "detail": "介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息"
                }
            ]
        })
    },
    queryAdvert: () => {
        return Mock.mock({
            'success': true,
            "message": '成功',
            "total": 500,
            "list|10": [
                {
                    "id|+1": 1,
                    "name|1": ["广告名称1", "广告名称2", "广告名称3"],
                    "imgUrl|1": ["http://www.hnjkfwy.com/upload/day_180520/201805201139129214.jpg", "http://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1527600577&di=a49676be1b756f35b8e3ab3cb4585143&imgtype=jpg&src=http%3A%2F%2Fimg6.bdstatic.com%2Fimg%2Fimage%2Fpublic%2Fwuqiuhuang.jpg"],
                    "isDisplay|1": ['0', '1'],
                    startTime: 1514736000000,
                    endTime: 1539086478323,
                    "detail": "介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息"
                }
            ]
        })
    },
    queryLessonList: () => {
        return Mock.mock({
            'success': true,
            "message": '成功',
            "total": 500,
            "list|10": [
                {
                    "id|+1": 1,
                    "name|1": ["课程名称1", "课程名称2", "课程名称3"],
                    "imgUrl|1": ["http://www.hnjkfwy.com/upload/day_180520/201805201139129214.jpg", "http://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1527600577&di=a49676be1b756f35b8e3ab3cb4585143&imgtype=jpg&src=http%3A%2F%2Fimg6.bdstatic.com%2Fimg%2Fimage%2Fpublic%2Fwuqiuhuang.jpg"],
                    "cate|1": ['1', '2', '3'],
                    "classHour|1": ["18天", "28天"],
                    trainingFee: 1000,
                    examInforFee: 100,
                    startTime: 1514736000000,
                    endTime: 1539086478323,
                    content: "<p>反反复复付付付付付付</p><p><img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKYAAAArCAYAAADypvNxAAAPGElEQVR42u1de1hVxRZfiC/CJ5rgI7SLz5vmWwOhLO2q3bqZpZmVt8cNX4hm4vuRYohwDnAOBwQ1X2Vlt5um3l4UadlbQFATRVQEPp9ZltfMq547c1qjwzh7n7332Ufgu/zx+zj7MWvPzP7tNWvWWjNAyOr90Md+FMIt5WagAcHTBGsJviY4QXAO8TPBYYIvCN4mmEswgqCtSc++hgEEt68+CMFp30GHxxZB2NJiMPsZNfAuoKfjCAywlpkhbD7BKQKnAeQROAiGEzQ1g5idVxTXELM6E7Pb8kMQluQRMZsTfGeQkDL8RPBP1LzNjNare9rRGmJWZ2K2W7sP+tpKjArwJThoIilF/EKwhiBCb936pZTWELM6E7P1+gK4I6MIwowN56u9SEoR1GYdo3k4t5ZDO8euGmJWV2K2WVcA7dbsJRrmmN7CnW4iKUV79FEtdeyYml9DzOoD34rEXFvgQndHsd5JkL2SiMnwb4IQtTp2Td4HHYfPq2rEpB9VPkGOBLkEXxF8QLAdj3MUUIDKwZO6BBO0EUlxk5GL3ppbKhAzeE2BC+1X/gB3JevSmkcqmZgUFwmeVKpjb/tRaD8mnhDzkFIbRhLsJvheBz4ieJ/gG5V7ctEl5iN5ZrKJ7Q/0gBB1CX5HN179SiJlS+49VhzKb1udfw297Ie1CgypAqTk8YqsnqHJ5dA27mMIiytSakeql21iJV9vE9QQIihBnsXydjyW3deQoI6HpHgCn/NeJWrLO7AOiTcQM5gQkqFLRiGEJpVqEfi3KkZMaeMogt8ogbBERa+DP4GfDtTBoAF9Xms39xp9WTNRfi8vk2IPPudOg+WpzzlaBVMIJhFMIIjCY/H621iHbdz1yXQkg+BXd19Du1X50Md2REulXvAiwejQupxgCcE6tD+0lo0U69op8yCEJZn2Mn3wOSd1lmuNftnRBI8rYBTanwX4jFkYGXtcBVRmuIF2dMNn7PLADPDqBBeCV+6ugK6Og1omQTO9UBnqpL9f4Xn0JZRrlBNcwdFuLzIrsgVIAvqMzTrLZXjxJb5loB2bsOwDHhCTjpqP4F8ZwtDedqKSGSpcH8LNUyKxLvT8YwQdIHjF7goIydgD/ZLdxs4XmNy5WzR0RgDBPg2yKpCmL2nLAPOGPzZSvKyz3N0E/8DyDM8QDELfrNiuy9xvOjmJIbiXYKwgg8rsYGAmzmS/6WVzgQZITqtcP4dtvdGPGZyZdwO62w+5e+AME0l5VEdDA3Em6U7mbaxMmHnakiIF5Y80SR792N5Amdlojzkx2jWMyz3YjsOvGc/cKvTVo14i5RaUP0rhenu8niMl5m0ZeTegQ9o+6J+k6jqKNJGYI3Q2eIkGmdFe6uydKL+rh3J64myY1dfKaVZ6PJ0j7mvcfe+gi8WT57KPYAz+Pm/CDF/pOQdV7nkI78mQE3N5rhQ9UlS15igTEzZqeSHi9JqXiHkR5dczWH4wwYdcPTehy4Rdfx/PDxfKUVvuOOfze97g8wtRRk/hQ1trcj8Vodw+GuYpE+VDeXquFF3sP5BhUNF1NMAkYu4w0OhaGtLrPvACKdug7EKddaU23YsEx7j6JShkTsW6sbdnCZGvUB11ieE+Bt5bwOT1M6mf5mlUDm/iffdKiRmUvseFQII26XnQNn0XIWYO3J6WB72TD7t7SZ7CKIFKKoGYf0HZ63WUuYWr0wX00UXjy0tATfW6gLWYHMOf20iwCInUm+AQyvxMYz2YPXdJDP1hwrYTZ8ie9lEXlPUrQW039xbjvUFSYjZJO+BCQNp+gLQTUDetFG53fAfBaTnQ1VaopgnKTCBmsYHG34odrCb3X14g5lSU/ZJOjWnHGTTgsOVpnwWjP3U2QUeN9TiKZYe5CS/P87CPGCfucXOfH5fWKM8uyl4WAdkJEfCttResTxkJPVKzARy/QdPUQuhkz4W+SYquo49N0pp/NhhKU0OcF4j5KsoeqtMhL5o/X6Jd+Sd09bhDe8QrBu3BjVguWeWefjKPhk68q6Pv2eToE0ViOpf4gDOOIJHAAnA2uQnMsc+GhvZiqGc/Bj2SFbVmoknE3KazA7QkJv/VC8Tci7KNrlFKNfghMjyI5efoKLNIx5C/Bu/daaBuC7HshzqVS6IiMY/HBcHxeAJLEJRbW8HF5PrgtAF8aosAP1sJBKSchFBriVI0xiyX0XiNDXJozDi6xWRS1kHZvytkDGnBRygjCofUB3SAaulPdWrsaLz/kAZ7j0VzzmOZJ3W06zksU6Sjb+KwzFhNxDxhDYQTyYFwytbCRc4DthC40/Y5dEw6JSvc1uToz3yVhjQiWKVRzute0Jad3WQM6XGheIIrGjV2FBfTb6GjjswN+JvGVLgRXHRKTwoec4v11UzMk8kt4IQtEI7bglzkLLW1hG5JeyBMLuCAyeQ8gMPP/egDo7FTm87Vl929QMwhas5gDWiB5X8kmIYOdK14CYdv5vfVGpU7oTTjdYMdWP4NN/eN5mbges2bH7FsI13EPGn7A+W2Vi5y7kgaCN3kob3MKpb6liXWMcxSagYxmX34rMHygzwkNmD5793ck84Nqy0MPof3bSplLk3kZtVtDbblZ9U1P2rEpKDa80qSLyy2LlNT5VUFN7hPelqLYIClTKuvLxqHwSjMJXyB+/jKPLBdmRaLNVieDc2pCteDcCMJNtHxNCOdOfLLBa1G1/xbuByH1gbSBpdi+XRVYp5afCv8PLcxXJjuB/+dXBuujvOBq+N94NKUOnBhlh/8FNsEzliawV5rL7jfsldm+12qIqRMkTWwszVfayKHmg37JQYVjL7ohwVZWvEF5kzSclcVMok6u+sDg2CRqtmS7KpvNH6kvphf+h8cvq9i+R/UhnEXMS9M84PLk3xdZHRGwnWMA7gyoZaLrOdn+8P5pQ3AmrhEJuSTKkDKctmMkA7jIUm7tA7nfTEX8BHECPzb16QXPYeLd+tFtkpGewBen2ayXU1DhfHCUN2MCxZozZ6iBD+D9nEJziHqul2+SzVkBUJKQEl78cV6sG9RLxhi2S8KmVAFiCl9ab0tRdDWsgtCzbEzzUIArvnRgmYeJIxUBdQyWlZGxBCCvxMkEsQSPErQmF77Lbo+bHh5gqyjr1YiKRVDhJ0TCyAgPgciLMegGr/c/88NDzhC+hGsIHBKcJpgBr3v9JQgeCruMyW/1M3GRqWG0eE7kJByUNJncK+1pOZlV1NiNiAoVCAlj4106N8RMwyGJFQIVQ6rBFKqLqTqmnAI+ls+h3np78LAGmJWW2Ju10BKhvm/TGoMUxe/JQorv4mkLMX12YoN65mQA1NT34NpjvdqiFlNiTlMBylduDquVousmOHwcHyezNfmbZwlaKXWqDBiU051bIUYx2aYkLpViZgDcVGdP7cRwXwho3wGzsz98d47hAzskUIkZCGmdM3AGT4f6pslbBix0E0mT2t8ZhfBPTcF0/pWo+NezNqZibPpuZgxL+aHLsCEED4PYL6w9icAfbqx6Hd8XmPIMQgTkt/BYMJgzn85W5LYPBnbIyXmRr3EJIg6HRUI8xdmijOwc14m5XnhRUk3bR2WtAfmpr1LSLkNJikTc4ewzGA9twMGPY7g0rjC8PciYb3KMa7tLBE3UMg19efqz0KEORrCp1YhoeI+TDYW+2RBuPq2PQ9JIlh81GUdF8Jk55ZJ5NB321+lviMV3hlgeJm9Px8ur9aJPk4pMQsMEHPVpfF14YvpQ7y5SE3WMV3cf7VlEGnPhsmpW1ykVCEmW+TViguTUWzA4yw8plrmLvw9A6+xDPLjws4kozlZe/C3hZPdjrue66Yt2Vw8mc+EH4TZQt3xpTrDr+/CzIct2aZnL3Afzy+cs55P2BXr8xWe64GL32K5XAZZXbtzmV33oZ8ynFu79BL3nJV4LhSPVykRs9AAMdfTSdDvk+rD2KUfejuxg2mmEC22yd2WozArbfM1UqoQk4XG6I7IizmNl4Uvnh7nCxsdPIUvi2kdtjDta047ALeeqR4XU2aLs1gGz31u2nIes4no7ySB+GLyckc0RZjmW4nrubdIViWewb/+nFxK8P3CojtxvTdzCdZVGX2U1iC9xZlhrM/7qy5G0znxYXiFTpqujPeFPTF9IGLZPtlGSWbu0KFxy+syeCR5N0xxbNFCzKncLhFMG67EzmNJ0IOFLVVofPcwapSxeG6xZC0QJWIeN0wOxb+ZqG3dZQk1x/u/FSaWPgqEqM+ZHhe5vqPa807h3qlcJrwTP9Ad+CHQ+xoKz+ZNlbOSOtTmPmq1JReXOM26K/z6pr8DlYgZY4CY/VwRoUgfcEb5wdMLMqFbQplo1JpBSl3LcCMspRDlyIKJHClViDlGYgtFC1qan4hQDfJfvNYJh0++PB+6+5I778BzZ7lzkzQu6soU1tK05+6JEIbXeDzuICRizOS0eJZgFlxCYu3jhvfekhh5imBjy4h5JVz+jx38uSQYcd+ry0qTKkrMRgQXdZBy53WnvA8hZ12Ij5kMDZcegX4JxWbtA3kZQ526XAyDrMVkNl5RW6oQ80HJhgPjuXMTJJ3LT2qaC7FsXnYWd429rP3cOZZR3hK19GDUSvvRNswWdsmI4Ybc6Vx62wVcOwSYGME+hFhM9mUTrtGcKcLb09OEY8BzTKut4JayfM2FGOegxvUViHsWn70Jn98c7WonZvCz/mH/TOK0Oz/mUI2kPE/QkhHzcmRtcD5XG9a9+ATUiyuGTrHfQP+Ew7IUej3YGm5op9wyGJWScwMpVYjZDu2tA5xPtAuey5fsTrEdM2RCOTdLDiYxiztzzMfJ2hzBpqVD+DiJ3TcRX/oZrh9SFWxiho8Fu/sdzu5lmvRhvLYBScAyer4XEl9OckP3OKEe5ySaUvzAKJYL9duJk6s+SNinhOXfJ5UmPmJIksbEf1QhZS5Bx2uJHURbXoysD87n60DGtGdcxGy/eKeMnMM1LiD71JNFZHdbjkFUapYeYjK/oI/knFIKVyPJOSVHv8wubioZBltJ8kJvVVmn3gkTPJQSRJqinShuFttAWD5bXxgRxD4IkMjhM/LrKfQnrV9jYS1RE4UhXnMSRzOCuQRZBMcIigg2EzwrJntcjvSFX8c1uoGYf5DzW5GczAG9Ad0SZTj0bENHsMepZfdYD5PZ+Ca9xKxBFcX/AJZozZE7bGrlAAAAAElFTkSuQmCC\"></p>"
                }
            ]
        })
    },
    queryVideoList: () => {
        return Mock.mock({
            'success': true,
            "message": '成功',
            "total": 500,
            "list|10": [
                {
                    "id|+1": 1,
                    "name|1": ["视频名称1", "视频名称2", "视频名称3"],
                    "cate|1": ['1', '2', '3'],
                    "detail": "介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息",
                    "imgUrl|1": ["http://www.hnjkfwy.com/upload/day_180520/201805201139129214.jpg","http://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1527600577&di=a49676be1b756f35b8e3ab3cb4585143&imgtype=jpg&src=http%3A%2F%2Fimg6.bdstatic.com%2Fimg%2Fimage%2Fpublic%2Fwuqiuhuang.jpg"],
                    "videoUrl|1": ["http://www.w3school.com.cn/i/movie.ogg", "http://vjs.zencdn.net/v/oceans.mp4"]
                }
            ]
        })
    },
    queryLessonCate: () => {
        return Mock.mock({
            'success': true,
            "message": '成功',
            "list|10": [
                {
                    "id|+1": 1,
                    "name|1": ["分类名称1", "分类名称2", "分类名称3"],
                    "detail": "介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息介绍信息"
                }
            ]
        })
    },
    queryProject: () => {
        return Mock.mock({
            'success': true,
            "message": '成功',
            "list|10": [
                {
                    "id|+1": 1,
                    "name|1": ["培训项目名称1", "培训项目名称2", "培训项目名称3"],
                    content: "<p>反反复复付付付付付付</p><p><img src=\"data:image/png;base64,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\"></p>"
                }
            ]
        })
    },
    queryVideoCate: () => {
        return Mock.mock({
            'success': true,
            "message": '成功',
            "list|10": [
                {
                    "id|+1": 1,
                    "name|1": ["视频分类名称1", "视频分类名称2", "视频分类名称3"],
                    detail: "视频分类名称描述视频分类名称描述视频分类名称描述视频分类名称描述视频分类名称描述视频分类名称描述视频分类名称描述视频分类名称描述"
                }
            ]
        })
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
    },
    queryNewsDetail: () => {
        return Mock.mock({
            success: true,
            message: true,
            data: {
                name: '新闻的名称',
                cate: '2',
                status: 1,
                coverMap:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533747132541&di=4a7d4ae6e9bd3068ad1b9a65ae75e235&imgtype=0&src=http%3A%2F%2Fimg1b.xgo-img.com.cn%2Fpics%2F1532%2F1531932.jpg",
                content: "<p>反反复复付付付付付付</p><p><img src=\"data:image/png;base64,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\"></p>"
            }
        });
    },
};
