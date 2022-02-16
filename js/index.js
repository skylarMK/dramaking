(function () { })();
var vm = new Vue({
    el: "#app",
    data() {
        return {
            name: 'dramaking',
            user: {
                id: 0,
                name: "",
                email: "",
                token: "",
                hasAgreed: null
            },
            game: {
                round: 0,
                score: 0,
                /* 0: 未開始, 1: 預備中, 2: 進行中, 3: 認證中, 4: 結束 */
                playState: 0,
                /* 0: 隱藏, 1: preload, 2: share, 3: video, 4: game clear, 5: CF video */
                blockState: 0,
                preloadStep: 0,
                cooldown: 0,
                videoTimer: 5,
                isVideoPaused: false,
                timerQueues: [],
                puzzle: {
                    id: 0,
                    tips: [],
                    haystack: [],
                    needles: []
                },
                uploadId: 0,
                history: [],
                config: {
                    clearance: 20,
                    round: 5,
                    helper: { express: [{ name: "EXPRESS_PASS", score: 1, cost: 0, quota: 1, cooldown: 0 }, { name: "EXPRESS_SHARE", score: 8, cost: 0, quota: 1, cooldown: 0 }, { name: "EXPRESS_VIDEO", score: 5, cost: 0, quota: 1, cooldown: 5 }], cues: [{ words: 1, score: 20, cost: 3, quota: 7, cooldown: 0 }, { words: 3, score: 20, cost: 5, quota: 7, cooldown: 0 }] }
                },
                puzzles: [
                    { "id": 13, "tips": ["賀軍翔", "田馥甄", "李威", "趙詠華"], "haystack": "好三愛要灌鬥火籃美要來不球言敵牛過亮打植格", "needles": [{ "word": "鬥", "position": 5 }, { "word": "牛", "position": 15 }, { "word": "要", "position": 3 }, { "word": "不", "position": 11 }, { "word": "要", "position": 9 }] }
                ],
            },
            news: [],
            isMuted: true,
            videos: [{ "title": "漢高網路出機", "id": "6y1Lqa5HgZU" }, { "title": "kawasaki", "id": "GT1Nq52WXgc" }, { "title": "特力屋", "id": "2O4Oyvuhk0Y" }, { "title": "畢書盡", "id": "GEayzkPqtuo" }],
            prize: {
                "daily": [
                    {
                        "weekly": "2020-08-03",
                        "date": "2020-08-03",
                        "name": "思必兒24小時表面長效抗菌噴霧-120ml/一組5入",
                        "preview": "daily/0803.png",
                        "link": "https://www.snaprotect.com.tw/products/24h-120",
                        "winners": [
                            { "name": "J**ssie Shan", "phone": "0987****76" },
                            { "name": "郭*華", "phone": "0912****60" },
                            { "name": "李*如", "phone": "0933****40" },
                            { "name": "曾*娥", "phone": "0934****12" },
                            { "name": "蔡*媚", "phone": "0937****62" }
                        ]
                    },
                    {
                        "weekly": "2020-08-03",
                        "date": "2020-08-04",
                        "name": "ThePremièreJourney經典太空修護膠囊組合",
                        "preview": "daily/0804.png",
                        "link": "https://ici-enorbite.com.tw/product/the-premiere-journey/",
                        "winners": [
                            { "name": "吳**萍", "phone": "0905****27" },
                            { "name": "H**iang Yen", "phone": "0963****66" },
                            { "name": "張**怡", "phone": "0915****90" },
                            { "name": "李**昆", "phone": "0956****65" },
                            { "name": "黃**萱", "phone": "0963****39" }
                        ]
                    },
                    {
                        "weekly": "2020-08-03",
                        "date": "2020-08-05",
                        "name": "禮麗國際精油芳香蠟燭",
                        "preview": "daily/0805.png",
                        "link": "",
                        "winners": [
                            { "name": "薛**豐", "phone": "0926****28" },
                            { "name": "林**宇", "phone": "0911****05" },
                            { "name": "廖**宣", "phone": "0975****81" },
                            { "name": "楊**富", "phone": "0972****14" },
                            { "name": "陳**樂", "phone": "0921****52" }
                        ]
                    },
                    {
                        "weekly": "2020-08-03",
                        "date": "2020-08-06",
                        "name": "鍋寶SODAMASTER+萬用氣泡水機(含CO2鋼瓶二入組)",
                        "preview": "daily/0806.png",
                        "link": "https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=7729826&Area=search&mdiv=403&oid=1_11&cid=index&kw=氣泡水機",
                        "winners": [
                            { "name": "李**金", "phone": "0918****70" },
                            { "name": "H**iang Lily", "phone": "0963****85" },
                            { "name": "I**ene Chiang", "phone": "0910****79" },
                            { "name": "黃**縉", "phone": "0912****17" },
                            { "name": "朱**樺", "phone": "0938****62" }
                        ]
                    },
                    {
                        "weekly": "2020-08-03",
                        "date": "2020-08-07",
                        "name": "思必兒24小時表面長效抗菌噴霧-120ml/一組5入",
                        "preview": "daily/0807.png",
                        "link": "https://www.snaprotect.com.tw/products/24h-120",
                        "winners": [
                            { "name": "徐**生", "phone": "0962****48" },
                            { "name": "徐**穎", "phone": "0975****59" },
                            { "name": "S**ihtien Kuo", "phone": "0921****25" },
                            { "name": "E**pty Teng", "phone": "0988****24" },
                            { "name": "陳**隆", "phone": "0932****82" }
                        ]
                    },
                    {
                        "weekly": "2020-08-03",
                        "date": "2020-08-08",
                        "name": "TT波特嫚面膜4盒裝",
                        "preview": "daily/0808.png",
                        "link": "https://www.ttbeauty.asia/",
                        "winners": [
                            { "name": "陳**桃", "phone": "0923****96" },
                            { "name": "李**儒", "phone": "0970****70" },
                            { "name": "李**樹", "phone": "0926****78" },
                            { "name": "I**ene Chiang", "phone": "0910****79" },
                            { "name": "常**華", "phone": "0963****66" }
                        ]
                    },
                    {
                        "weekly": "2020-08-03",
                        "date": "2020-08-09",
                        "name": "正官庄高麗蔘精30入/2盒",
                        "preview": "daily/0809.png",
                        "link": "https://www.kgcshop.com.tw/",
                        "winners": [
                            { "name": "高**芳", "phone": "0937****21" },
                            { "name": "楊**佳", "phone": "0908****15" },
                            { "name": "盧**玫", "phone": "0910****32" },
                            { "name": "王**成", "phone": "0952****25" },
                            { "name": "吳**妡", "phone": "0916****73" }
                        ]
                    },
                    {
                        "weekly": "2020-08-10",
                        "date": "2020-08-10",
                        "name": "思必兒24小時表面長效抗菌噴霧-120ml/一組5入",
                        "preview": "daily/0810.png",
                        "link": "https://www.snaprotect.com.tw/products/24h-120",
                        "winners": [
                            { "name": "劉**福", "phone": "0928****91" },
                            { "name": "陳**祐", "phone": "0939****15" },
                            { "name": "張**閎", "phone": "0902****31" },
                            { "name": "李**均", "phone": "0958****75" },
                            { "name": "丁**婷", "phone": "0928****49" }
                        ]
                    },
                    {
                        "weekly": "2020-08-10",
                        "date": "2020-08-11",
                        "name": "ThePremièreJourney經典太空修護膠囊組合",
                        "preview": "daily/0811.png",
                        "link": "https://ici-enorbite.com.tw/product/the-premiere-journey/",
                        "winners": [
                            { "name": "曾**敏", "phone": "0919****54" },
                            { "name": "吳**玲", "phone": "0987****25" },
                            { "name": "徐**萍", "phone": "0968****07" },
                            { "name": "陳**銘", "phone": "0981****88" },
                            { "name": "夏**綸", "phone": "0937****22" }
                        ]
                    },
                    {
                        "weekly": "2020-08-10",
                        "date": "2020-08-12",
                        "name": "鍋寶SODAMASTER+萬用氣泡水機(含CO2鋼瓶二入組)",
                        "preview": "daily/0812.png",
                        "link": "https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=7729826&Area=search&mdiv=403&oid=1_11&cid=index&kw=氣泡水機",
                        "winners": [
                            { "name": "游**鈴", "phone": "0916****60" },
                            { "name": "楊**美", "phone": "0936****38" },
                            { "name": "陳**涵", "phone": "0909****27" },
                            { "name": "曾**洋", "phone": "0932****34" },
                            { "name": "陳**萱", "phone": "0923****96" }
                        ]
                    },
                    {
                        "weekly": "2020-08-10",
                        "date": "2020-08-13",
                        "name": "思必兒24小時表面長效抗菌噴霧-120ml/一組5入",
                        "preview": "daily/0813.png",
                        "link": "https://www.snaprotect.com.tw/products/24h-120",
                        "winners": [
                            { "name": "鄭**嘉", "phone": "0936****82" },
                            { "name": "翁**泰", "phone": "0933****12" },
                            { "name": "張**瑞", "phone": "0912****98" },
                            { "name": "黃**妍", "phone": "0975****58" },
                            { "name": "洪**亭", "phone": "0952****52" }
                        ]
                    },
                    {
                        "weekly": "2020-08-10",
                        "date": "2020-08-14",
                        "name": "TT波特嫚面膜4盒裝",
                        "preview": "daily/0814.png",
                        "link": "https://www.ttbeauty.asia/",
                        "winners": [
                            { "name": "黃**凱", "phone": "0920****38" },
                            { "name": "鍾**英", "phone": "0910****17" },
                            { "name": "簡**晨", "phone": "0976****68" },
                            { "name": "張**瑛", "phone": "0903****77" },
                            { "name": "J**rry", "phone": "0910****02" }
                        ]
                    },
                    {
                        "weekly": "2020-08-10",
                        "date": "2020-08-15",
                        "name": "正官庄高麗蔘精30入/2盒",
                        "preview": "daily/0815.png",
                        "link": "https://www.kgcshop.com.tw/",
                        "winners": [
                            { "name": "黃**萍", "phone": "0933****85" },
                            { "name": "林**明", "phone": "0931****02" },
                            { "name": "范**喆", "phone": "0939****22" },
                            { "name": "張**娜", "phone": "0937****03" },
                            { "name": "謝**蓉", "phone": "0939****87" }
                        ]
                    },
                    {
                        "weekly": "2020-08-10",
                        "date": "2020-08-16",
                        "name": "foodpanda100元即享券",
                        "preview": "daily/0816.png",
                        "link": "",
                        "winners": [
                            { "name": "薛**婷", "phone": "0975****40" },
                            { "name": "賴**霈", "phone": "0976****45" },
                            { "name": "高**騏", "phone": "0910****39" },
                            { "name": "羅**雯", "phone": "0919****92" },
                            { "name": "顏**翔", "phone": "0963****66" }
                        ]
                    },
                    {
                        "weekly": "2020-08-17",
                        "date": "2020-08-17",
                        "name": "思必兒24小時表面長效抗菌噴霧-120ml/一組5入",
                        "preview": "daily/0817.png",
                        "link": "https://www.snaprotect.com.tw/products/24h-120",
                        "winners": [
                            { "name": "柯**全", "phone": "0981****12" },
                            { "name": "胡**妹", "phone": "0928****10" },
                            { "name": "黃**傑", "phone": "0932****18" },
                            { "name": "許*金蘭", "phone": "0979****02" },
                            { "name": "陳*阿閃", "phone": "0930****67" }
                        ]
                    },
                    {
                        "weekly": "2020-08-17",
                        "date": "2020-08-18",
                        "name": "TT波特嫚面膜4盒裝",
                        "preview": "daily/0818.png",
                        "link": "https://www.ttbeauty.asia/",
                        "winners": [
                            { "name": "陳**涵", "phone": "0909****27" },
                            { "name": "常**華", "phone": "0938****04" },
                            { "name": "許**茹", "phone": "0910****84" },
                            { "name": "連**慧", "phone": "0928****17" },
                            { "name": "朱**瑩", "phone": "0915****28" }
                        ]
                    },
                    {
                        "weekly": "2020-08-17",
                        "date": "2020-08-19",
                        "name": "ThePremièreJourney經典太空修護膠囊組合",
                        "preview": "daily/0819.png",
                        "link": "https://ici-enorbite.com.tw/product/the-premiere-journey/",
                        "winners": [
                            { "name": "梁**貞", "phone": "0976****57" },
                            { "name": "吳**毅", "phone": "0911****79" },
                            { "name": "鄒**人", "phone": "0919****53" },
                            { "name": "高**芳", "phone": "0937****21" },
                            { "name": "蔡**靜", "phone": "0932****93" }
                        ]
                    },
                    {
                        "weekly": "2020-08-17",
                        "date": "2020-08-20",
                        "name": "思必兒24小時表面長效抗菌噴霧-120ml/一組5入",
                        "preview": "daily/0820.png",
                        "link": "https://www.snaprotect.com.tw/products/24h-120",
                        "winners": [
                            { "name": "葉**妤", "phone": "0908****73" },
                            { "name": "張**翔", "phone": "0952****38" },
                            { "name": "陳**菁", "phone": "0970****09" },
                            { "name": "游**萱", "phone": "0907****12" },
                            { "name": "蒲**訓", "phone": "0987****41" }
                        ]
                    },
                    {
                        "weekly": "2020-08-17",
                        "date": "2020-08-21",
                        "name": "foodpanda100元即享券",
                        "preview": "daily/0821.png",
                        "link": "",
                        "winners": [
                            { "name": "李**雲", "phone": "0981****35" },
                            { "name": "江**祥", "phone": "0926****25" },
                            { "name": "涂*美人", "phone": "0972****90" },
                            { "name": "林**容", "phone": "0937****25" },
                            { "name": "薛**婷", "phone": "0975****40" }
                        ]
                    },
                    {
                        "weekly": "2020-08-17",
                        "date": "2020-08-22",
                        "name": "正官庄高麗蔘精30入/2盒",
                        "preview": "daily/0822.png",
                        "link": "https://www.kgcshop.com.tw/",
                        "winners": [
                            { "name": "許**慈", "phone": "0910****83" },
                            { "name": "胡**玲", "phone": "0976****69" },
                            { "name": "成*阿雪", "phone": "0933****65" },
                            { "name": "顏**成", "phone": "0910****78" },
                            { "name": "梁**崇", "phone": "0953****17" }
                        ]
                    },
                    {
                        "weekly": "2020-08-17",
                        "date": "2020-08-23",
                        "name": "鍋寶SODAMASTER+萬用氣泡水機(含CO2鋼瓶二入組)",
                        "preview": "daily/0823.png",
                        "link": "https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=7729826&Area=search&mdiv=403&oid=1_11&cid=index&kw=氣泡水機",
                        "winners": [
                            { "name": "黃**潤", "phone": "0911****91" },
                            { "name": "洪**蘋", "phone": "0953****66" },
                            { "name": "萬**伃", "phone": "0970****00" },
                            { "name": "吳**娟", "phone": "0977****88" },
                            { "name": "陳**如", "phone": "0939****46" }
                        ]
                    }
                ],
                "weekly": [
                    {
                        "weekly": "2020-08-03",
                        "isActive": true,
                        "name": "CAT手機乙支",
                        "preview": "weekly/week1.png",
                        "link": "https://www.palcom-international.com/cat-s61/",
                        "winners": [
                            { "name": "J**ssie Shan", "phone": "0987****76" },
                            { "name": "黃*妮", "phone": "0953****90" },
                            { "name": "兵*娟", "phone": "0989****92" }
                        ]
                    },
                    {
                        "weekly": "2020-08-10",
                        "isActive": false,
                        "name": "iPhone11(64g)手機",
                        "preview": "weekly/week2.png",
                        "link": "",
                        "winners": [
                            { "name": "王**銘", "phone": "0920****03" }
                        ]
                    },
                    {
                        "weekly": "2020-08-17",
                        "isActive": false,
                        "name": "日本IRISPM2.5空氣清淨除濕機",
                        "preview": "weekly/week3.png",
                        "link": "https://www.presto.com.tw/products/iris-ijc-h120-iris空氣清淨除濕機送iris-fac2",
                        "winners": [
                            { "name": "黃*原", "phone": "0912****06" },
                            { "name": "謝*村", "phone": "0910****83" },
                            { "name": "盧*明", "phone": "0953****66" },
                            { "name": "莊*雯", "phone": "0986****75" },
                            { "name": "嚴*權", "phone": "0952****40" }
                        ]
                    }
                ],
                "pass": [
                    {
                        "name": "ALLPA頭獎",
                        "summary": "5題全過且獲得滿分100分",
                        "isActive": true,
                        "gifts": [
                            {
                                "name": "瑪謝-好心機健康椅M1",
                                "preview": "1-1.png",
                                "link": "https://www.masse.com.tw/pages/product-1",
                                "winners": [
                                    { "name": "梁*棋", "phone": "lia****nk19@gmail.com" },
                                    { "name": "萬*伃", "phone": "can****050721@gmail.com" }
                                ]
                            },
                            {
                                "name": "CAT手機乙支",
                                "preview": "1-2.png",
                                "link": "https://www.palcom-international.com/cat-s61/",
                                "winners": [
                                    { "name": "T*yami MA", "phone": "civ****atyop@hotmail.com" },
                                    { "name": "L*mon Huang", "phone": "oba****@livemail.tw" },
                                    { "name": "翊*顏", "phone": "abc****46@yahoo.com.tw" }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "好棒棒參加獎",
                        "summary": "5題全過不滿100",
                        "isActive": false,
                        "gifts": [
                            {
                                "name": "福庫空氣清淨機",
                                "preview": "2-1.png",
                                "link": "https://m.momoshop.com.tw/goods.momo?i_code=7114205&cc1=2902000015",
                                "winners": [
                                    { "name": "王*儒", "phone": "a23****0@yahoo.com.tw" },
                                    { "name": "C*risty Chen", "phone": "pho****_111873@yahoo.com.tw" },
                                    { "name": "洪*吟", "phone": "zxp****gmail.com" }
                                ]
                            },
                            {
                                "name": "飛騰家電RM66RTM",
                                "preview": "2-2.png",
                                "link": "http://www.vastar.com.tw/",
                                "winners": [
                                    { "name": "白*子", "phone": "a09****8@gmail.com" },
                                    { "name": "林*伶", "phone": "lil****n1017@gmail.com" },
                                    { "name": "魏*打", "phone": "ath****6521@gmail.com" },
                                    { "name": "R*y Luo", "phone": "bai****ay@gmail.com" },
                                    { "name": "戴*珊", "phone": "dia****221987@gmail.com" },
                                    { "name": "周*瓊", "phone": "joy****06@yahoo.com.tw" },
                                    { "name": "育*林", "phone": "unl****bc@msa.hinet.net" },
                                    { "name": "張*妘", "phone": "kai****408@yahoo.com.tw" },
                                    { "name": "吳*毅", "phone": "Cub****nt8678@gmail.com" }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "揪友挑戰獎",
                        "summary": "公開分享成績",
                        "isActive": false,
                        "gifts": [
                            {
                                "name": "思必兒24小時表面長效抗菌噴霧-120ml/一組5入",
                                "preview": "3-1.png",
                                "link": "https://www.snaprotect.com.tw/products/24h-120",
                                "winners": [
                                    { "name": "V*rina Lee", "phone": "var****727@gmail.com" },
                                    { "name": "S*ihchun Cheng", "phone": "tob****4@pchome.com.tw" },
                                    { "name": "陳*桃", "phone": "moi****si_tw@yahoo.com.tw" },
                                    { "name": "C*iao Shuang Lin", "phone": "pup****3@hotmail.com" },
                                    { "name": "許*妮", "phone": "hsu****uni851002@gmail.com" },
                                    { "name": "張*怡", "phone": "h73****yahoo.com.tw" },
                                    { "name": "張*同", "phone": "ton****il.sanlih.com.tw" },
                                    { "name": "A*uan Ping", "phone": "dc7****c@yahoo.com.tw" },
                                    { "name": "E*a Chen", "phone": "eve****15@yahoo.com.tw" },
                                    { "name": "羅*彤", "phone": "eva****28@yahoo.com.tw" }
                                ]
                            },
                            {
                                "name": "追劇神器Vidol超值看片方案",
                                "preview": "3-2.png",
                                "link": "https://vidol.tv/",
                                "winners": [
                                    { "name": "歐*丁", "phone": "lik****5@yahoo.com.tw" },
                                    { "name": "林*發", "phone": "chi****007@gmail.com" },
                                    { "name": "郭*芳", "phone": "ann****14@gmail.com" },
                                    { "name": "林*當", "phone": "ase****1020@yahoo.com.tw" },
                                    { "name": "M*rcelo Mai", "phone": "nan****0129@outlook.com" },
                                    { "name": "S*ihchun Cheng", "phone": "tob****4@pchome.com.tw" },
                                    { "name": "N*il Chen", "phone": "nam****8@yahoo.com.tw" },
                                    { "name": "余*葵", "phone": "img****@hotmail.com" },
                                    { "name": "E*son Kuo", "phone": "kuo****tien@gmail.com" },
                                    { "name": "施*宜", "phone": "p20****yahoo.com" },
                                    { "name": "林*慈", "phone": "jje****51108@yahoo.com.tw" },
                                    { "name": "池*枝", "phone": "chi****22086@gmail.com" },
                                    { "name": "A*uan Ping", "phone": "dc7****c@yahoo.com.tw" },
                                    { "name": "緹*", "phone": "myl****ot9991314@yahoo.com.tw" },
                                    { "name": "A*uan Ping", "phone": "dc7****c@yahoo.com.tw" },
                                    { "name": "C*ih Ling Wang", "phone": "kev****at@msn.com" },
                                    { "name": "陳*祐", "phone": "con****@yahoo.com.tw" },
                                    { "name": "李*如", "phone": "sue****106@gmail.com" },
                                    { "name": "J*ssie Shan", "phone": "u87****5@gmail.com" },
                                    { "name": "劉*菱", "phone": "emi****1235@yahoo.com.tw" }
                                ]
                            }
                        ]
                    }
                ]
            },
            bulletinBoard: {
                prizeName: "",
                winners: [
                    { name: "", phone: "" },
                ]
            },
            classObject: {
                winnerBox: false
            }
        };
    },
    created() {
        var round = 0;
        /* var num = this.getRandomInt(0, 4); */
        this.game.puzzle.tips = this.game.puzzles[round].tips;
        this.game.puzzle.haystack = Array.from({ length: 21 }, function () { return ""; });
        this.game.puzzle.needles = Array.from(
            {
                length: 7
            },
            function () {
                return {
                    position: -1,
                    word: "",
                    isDiff: false
                };
            });
    },
    mounted() {
        this.getNews().then(function () {
            $('.newsCarousel').owlCarousel({
                loop: true,
                margin: 0,
                nav: true,
                dots: false,
                autoplay: true,
                autoplayTimeout: 2000,
                autoplayHoverPause: true,
                lazyLoad: true,
                navClass: ["carouselNav_prev", "carouselNav_next"],
                navText: [" ", " "],
                navContainerClass: "carouselNav",
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 2
                    },
                    900: {
                        items: 3
                    },
                    1200: {
                        items: 3
                    }
                }
            });
        });
    },
    computed: {
        tips: function () {
            return this.game.puzzle.tips;
        },
        haystack: function () {
            return this.game.puzzle.haystack;
        },
        needles: function () {
            return this.game.puzzle.needles;
        },
        spacePosition: function () {
            return this.game.puzzle.needles.findIndex(function (e) { return e.position == -1; });
        },
        isMatched: function () {
            return this.game.puzzle.needles.map(function (v) { return v.word }).join("") == this.game.puzzles[this.game.round].needles.map(function (v) { return v.word }).join("")
                ? true : false;
        },
        matchAnimation: function () {
            return {
                animate__flash: this.spacePosition == -1 && this.isMatched,
                animate__shakeX: this.spacePosition == -1 && !this.isMatched
            }
        },
        activePrizes: function () {
            return this.prize.pass.filter(function (v) { return v.isActive == true; });
        },
        activeWeeklyPrizes: function () {
            var weeklyGift = this.prize.weekly.find(function (v) { return v.isActive == true; });
            var gifts = this.prize.daily.filter(function (v) { return v.weekly == this }, weeklyGift.weekly);
            gifts.splice(gifts.length, 0, weeklyGift);
            return gifts;
        },
        timerCtrl: function () {
            return {
                timer: this.game.cooldown > 0
            };
        },
        videoTimerCtrl: function () {
            return {
                timer: (this.game.blockState == 3 || this.game.blockState == 5) && this.game.videoTimer != "x",
                "iteration-5": (this.game.blockState == 3 || this.game.blockState == 5) && this.game.videoTimer != "x",
                "paused": this.game.isVideoPaused
            };
        },
        shareImageUrl: function () {
            return 'https://event.setn.com/share/images/2020DRAMAKING/' + this.game.uploadId + '.jpg';
        }
    },
    methods: {
        play() {
            if (this.game.playState != 0) {
                return false;
            }

            if (!register()) {
                return false;
            }

            this.getPuzzles()
                .then(function (vm) {
                    vm.initGame();
                });
        },
        replay() {
            this.game.playState = 0;
            this.game.blockState = 0;
            $('a[href=#section1]').trigger("click");
        },
        initGame() {
            this.game.round = 0;
            this.game.score = 0;
            this.game.uploadId = 0;
            this.game.history.splice(0);
            this.game.history.push("GAME_START");
            this.game.playState = 2;
            if (this.game.preloadStep == 0) {
                this.game.playState = 1;
                this.game.blockState = 1;
            }

            this.initPuzzle();
        },
        initPuzzle() {
            var round = this.game.round;
            this.game.puzzle.tips = this.game.puzzles[round].tips;
            this.game.puzzle.haystack = this.game.puzzles[round].haystack.split("");
            this.game.puzzle.needles = Array.from(
                {
                    length: this.game.puzzles[round].needles.length
                },
                function () {
                    return {
                        position: -1,
                        word: "",
                        isDiff: false
                    };
                });

            this.game.history.push("ROUND_START_" + round);
        },
        pick(index, target) {
            var word = this.game.puzzle.haystack[index];
            if (word == "") {
                return false;
            }

            var position;
            position = this.spacePosition;
            if (target !== undefined) {
                position = target;
            }

            if (position == -1) {
                return false;
            }

            if (this.game.puzzle.needles[position].position != index) {
                this.removeNeedle(position);
            }

            var needle = {
                position: index,
                word: word,
                isDiff: target !== undefined ? true : false
            };
            this.game.puzzle.needles.splice(position, 1, needle);
            this.game.puzzle.haystack[index] = "";

            return true;
        },
        nextRound() {
            if (this.spacePosition != -1) {
                return true;
            }

            if (!this.isMatched) {
                return true;
            }

            if (this.game.blockState == 5) {
                this.game.history.push("ROUND_VIDEO");
                this.game.blockState = 0;
                this.game.round++;
                this.initPuzzle();

                return true;
            }

            if (this.game.history.indexOf("ROUND_CLEAR_" + this.game.round) != -1) {
                return false;
            }


            var name = this.game.history.slice(-1)[0];
            var helper = this.getExpressByName(name);

            this.game.score += helper ? helper.score : this.game.config.clearance;

            this.game.history.push("ROUND_CLEAR_" + this.game.round);
            this.$nextTick()
                .then(function (vm) {
                    if (vm.game.round == vm.game.config.round - 1) {
                        vm.game.playState = 4;
                        vm.game.history.push("GAME_CLEAR");
                        vm.game.blockState = 4;
                        $.ajax({
                            method: "POST",
                            url: "https://event.setn.com/api/score/2020DRAMAKING",
                            data: {
                                "fb_id": vm.user.id,
                                "name": vm.user.name,
                                "email": vm.user.email,
                                "num": vm.game.score
                            },
                            dataType: "json",
                            context: this,
                            success: function (response) {
                                vm.game.uploadId = response.id;
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                            }
                        });

                        return true;
                    }

                    if (vm.game.round == 0 || vm.game.round == 3) {
                        vm.game.blockState = 5;
                        vm.game.videoTimer = 5;
                        var videoId = vm.videos.map(function (v) { return v.id; }).sort(function (a, b) { return 0.5 - Math.random(); })[0];
                        player.cueVideoById(videoId).playVideo();

                        return true;
                    }

                    vm.game.round++;
                    vm.initPuzzle();
                });
        },
        removeNeedle(index) {
            var needle = this.game.puzzle.needles[index];
            if (needle.position == -1) {
                return false;
            }

            this.game.puzzle.haystack.splice(needle.position, 1, needle.word);

            needle.position = -1;
            needle.word = "";
            this.game.puzzle.needles.splice(index, 1, needle);
        },
        express(name) {
            if (this.game.playState != 2) {
                return false;
            }

            if (!this.hasExpressQuota(name)) {
                return false;
            }

            switch (name) {
                case "EXPRESS_SHARE":
                    this.game.blockState = 2;
                    facebookMe.target.refer = "2020DRAMAKING";
                    facebookMe.target.href = "https://acts.setn.com/event/2020DRAMAKING/";
                    facebookMe.target.hashtag = "#三立新聞網Ｋ劇之王天天送豪禮";
                    facebookMe.share(this.clearRound, name);
                    break;

                case "EXPRESS_VIDEO":
                    this.game.blockState = 3;
                    this.game.videoTimer = this.game.config.helper.express.find(function (v) { return v.name == this }, name).cooldown;
                    var videoId = this.videos.map(function (v) { return v.id; }).sort(function (a, b) { return 0.5 - Math.random(); })[0];
                    player.cueVideoById(videoId).playVideo();

                    break;

                default:
                    this.clearRound(name);
            }

            return true;
        },
        cue(size) {
            if (this.game.playState != 2) {
                return false;
            }

            var cue = this.getCueBySize(size);
            if (this.game.score < cue.cost) {
                $('.info').trigger('click');
                return false;
            }

            this.game.score -= cue.cost;
            this.game.history.push("CUE_" + size);

            var needles = this.game.puzzles[this.game.round].needles;
            let selected = needles.map(function (v, i) { return i; })
                .sort(function (a, b) { return 0.5 - Math.random(); })
                .slice(0, size)
                .sort();

            var index, target;
            for (var i in selected) {
                target = selected[i];

                index = this.game.puzzle.needles
                    .map(function (v) { return v.position })
                    .indexOf(needles[target].position);
                if (index != -1) {
                    this.removeNeedle(index);
                }

                this.pick(needles[target].position, target);
            }
        },
        delay(callback, seconds) {
            if (!seconds) {
                seconds = 1;
            }

            this.game.timerQueues.push(callback);
            this.game.cooldown = 1;
        },
        timeUp() {
            this.game.timerQueues.shift()();
            this.game.cooldown = 0;
        },
        videoTimeUp() {
            this.game.videoTimer = "x";
        },
        videoTimeIteration() {
            this.game.videoTimer--;
        },
        clearRound(name) {
            if (!name) {
                return false;
            }

            this.game.history.push(name);
            /* this.game.blockState = 0; */

            for (var i in this.game.puzzle.needles) {
                this.removeNeedle(i);
            }

            var needles = this.game.puzzles[this.game.round].needles.map(function (v) { return v.word }).join("");
            var index = -1;
            for (var i in needles) {
                index = this.haystack.indexOf(needles[i]);
                this.pick(index);
            }
        },
        getExpressByName(name) {
            return this.game.config.helper.express.find(function (v) {
                return v.name == this.name;
            }, { name: name });
        },
        hasExpressQuota(name) {
            var express = this.getExpressByName(name);
            return express.quota > this.game.history.filter(function (v) { return v == this }, name).length;

        },
        getCueBySize(size) {
            return this.game.config.helper.cues.find(function (v) {
                return v.words == this.size;
            }, { size: size });
        },
        getRandomInt: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        setAcitivePrize(index) {
            this.prize.pass.forEach(function (v) { v.isActive = false; });
            this.prize.pass[index].isActive = true;
        },
        setWeeklyGifts(index) {
            var prize = this.prize.weekly[index];
            if (Date.now() < new Date(prize.weekly)) {
                return false;
            }

            this.prize.weekly.forEach(function (v) { v.isActive = false; });
            prize.isActive = true;
        },
        nextPreload() {
            this.game.preloadStep++;
            if (this.game.preloadStep == 2) {
                this.game.blockState = 0;
                this.game.playState = 2;
            }
        },
        closeVideo() {
            if (this.game.videoTimer != "x") {
                return false;
            }

            player.stopVideo();
            if (this.game.blockState == 3) {
                this.clearRound("EXPRESS_VIDEO");
                this.game.blockState = 0;
                return true;
            }

            this.nextRound();
        },
        async getPuzzles() {
            return await axios({
                method: "get",
                url: "assets/puzzles.json",
                data: {}
            }).then(function (response) {
                var puzzles = response.data;
                vm.game.puzzles.splice(0);
                puzzles
                    .sort(function (a, b) { return 0.5 - Math.random(); })
                    .slice(0, 5)
                    .forEach(function (v) {
                        vm.game.puzzles.push(v);
                    });
                return vm;
            }).catch(function (error) {
                console.error(error);
            });
        },
        async getNews() {
            return await axios({
                method: "get",
                url: "assets/news.json",
                data: {}
            }).then(function (response) {
                var news = response.data;
                news.forEach(function (v) {
                    vm.news.push(v);
                });
            }).catch(function (error) {
                console.error(error);
            });
        },
        async getPrize() {
            return await axios({
                method: "get",
                url: "assets/prize.json",
                data: {}
            }).then(function (response) {
                var data = response.data;
                Array.prototype.splice.apply(vm.prize.daily, [0, 1, ...data.daily]);
                Array.prototype.splice.apply(vm.prize.weekly, [0, 1, ...data.weekly]);
                Array.prototype.splice.apply(vm.prize.pass, [0, 1, ...data.pass]);
            }).catch(function (error) {
                console.error(error);
            });
        },
        shareMyScore() {
            facebookMe.target.refer = "2020DRAMAKING";
            facebookMe.target.href = "https://event.setn.com/share/2020DRAMAKING/" + this.game.uploadId;
            facebookMe.target.hashtag = "#三立新聞網Ｋ劇之王天天送豪禮";
            facebookMe.share();
        },
        toggleWeeklyWinnerBox(index) {
            if (index === undefined) {
                this.toggleWinnerBox();
                return true;
            }

            this.bulletinBoard = Object.assign({}, this.activeWeeklyPrizes[index]);
            this.classObject.winnerBox = true;
        },
        togglePassWinnerBox(index) {
            if (index === undefined) {
                this.toggleWinnerBox();
                return true;
            }

            this.bulletinBoard = Object.assign({}, this.activePrizes[0].gifts[index]);
            this.classObject.winnerBox = true;
        },
        toggleWinnerBox(){
            this.classObject.winnerBox ^= true;
        }
    }
});

function register() {
    vm.game.playState = 3;
    if (!vm.user.token.length) {
        openFacebookRegister();
        return false;
    }

    return true;
}

function openFacebookRegister() {
    window.open('https://memberapi.setn.com/Customer/FacebookLoginForEvent?e=' + vm.name, '', config = 'height=800,width=600');
    return true;
}

function callbackFacebookLogin(data) {
    if (data.result !== true) {
        return false;
    }

    vm.user.token = data.GetObject.token;
    $.ajax({
        method: "GET",
        url: "https://event.setn.com/api/user",
        data: { token: vm.user.token },
        dataType: "json",
        context: this,
        success: function (response) {
            vm.user.id = response.fb_id;
            vm.user.name = response.name;
            vm.user.email = response.email;
            vm.game.playState = 0;
            vm.play();
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

$(document).ready(function () {
    if (document.location.protocol == "http:") {
        window.location.replace(window.location.href.replace("http:", "https:"));
    }

    window.addEventListener('message', function (event) {
        if ((event.origin.indexOf('setn.com') != -1) || (event.origin.indexOf('sanlih.com.tw') != -1)) {
            callbackFacebookLogin(event.data);
        }
    });
});

var player;

window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player('player', {
        videoId: '',
        playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            modestbranding: 0,
            loop: 0,
            playlist: ['GT1Nq52WXgc', '6y1Lqa5HgZU', '2O4Oyvuhk0Y', 'GEayzkPqtuo'],
            fs: 0,
            cc_load_policty: 0,
            iv_load_policy: 3,
            autohide: 0,
            origin: 'https://acts.setn.com'
        },
        events: {
            onReady: function (e) {
                /* e.target.mute(); */
                /* e.target.playVideo(); */
            },
            onStateChange: function (e) {
                switch (e.data) {
                    case YT.PlayerState.ENDED:
                        vm.closeVideo();
                        break;
                    case YT.PlayerState.PLAYING:
                        vm.game.isVideoPaused = false;
                        break;
                    case YT.PlayerState.PAUSED:
                        vm.game.isVideoPaused = true;
                        if (e.target.isMuted()) {
                            e.target.unMute();
                        } else {
                            e.target.mute();
                        }

                        e.target.playVideo();
                        vm.isMuted = !e.target.isMuted();
                        break;
                }
            }
        }
    });
}