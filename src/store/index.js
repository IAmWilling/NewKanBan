import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        login: 0, ///判断是不是失败 防止直接地址栏跳转
        jurisdiction: 2, // 权限  1是管理员  2是普通成员
        projectList: [], //项目列（左边一栏）
        itemizedList: [], //项目分类列表模   ------>>>>>>(原始数据)
        ViewClassificationArray: [], //视图分类数组（根据动态路由 动态点击变换的视图数组）
        CurrentSelection: '', //表示当前选中那个项目了
        pp: 0,
        username: '', //用户名
        img: '', //头像
        journalList: [], //日志列表
    },
    actions: {
        GetJournalInfo(ctx, data) {
            ctx.commit('GetJournalInfo', data)
        },

        addProject(ctx, data) {
            ctx.commit("addProject", data);
        },
        PassInTheCorrespondingProject(ctx, data) {
            ctx.commit("PassInTheCorrespondingProject", data);
        },
        //增加分类
        addClassify(ctx, data) {
            ctx.commit("addClassify", data)
        },
        CurrentSelection(ctx, data) {
            ctx.commit("CurrentSelection", data)
        },
        //加入当前分类内容
        AddTheCurrentCategoryContent(ctx, data) {
            ctx.commit("AddTheCurrentCategoryContent", data)
        },
        //拖拽操作
        dragAndDrop(ctx, data) {
            ctx.commit("dragAndDrop", data)
        },
        //删除子项操作
        sureDeleteChild(ctx, data) {
            ctx.commit("sureDeleteChild", data)
        },
        //发布评论
        addComment(ctx, data) {
            ctx.commit("addComment", data)
        },
        //给主页传送数据
        changeJurisdiction(ctx, data) {
            ctx.commit('changeJurisdiction', data)
        },
        //发送到日志中
        pushJournal(ctx, data) {
            ctx.commit('pushJournal', data)
        }
    },
    mutations: {
        //初始化
        GetDataItemList(store, data) {
            store.itemizedList = [];
            store.itemizedList = data;
            store.projectList = [];
            for (let i = 0; i < store.itemizedList.length; i++) {
                let Array = {
                        name: store.itemizedList[i].cont,
                        projectId: Math.floor(Math.random() * 999999),
                        len: store.itemizedList[i].ar.length
                    }
                    //分拣给project项目列表
                store.projectList.push(Array);
            }
        },
        //增加数组
        addProject(store, data) {
            store.projectList.push(data)
                //当添加一个项目的时候进行创建该项目错对应的数组
            let Array = {
                cont: data.name,
                ar: []
            }
            store.itemizedList.push(Array);
            console.log(store.itemizedList)

        },
        //这里是对点击项目名称进行处理 然后甩给分类视图数组进行对目标路由渲染
        PassInTheCorrespondingProject(store, data) {
            store.ViewClassificationArray = []; //每次点击都需要将数组变为空值
            store.ViewClassificationArray = data;
            console.log(store.ViewClassificationArray)
        },
        //增加分类
        addClassify(store, data) {
            let Array = {
                    title: data,
                    fenlei: []
                }
                //首先加入到视图数据中
                //不止怎么回事只要这里内容改变 原始数组内容也会有所变化 大概这就可以了吧 虽然
                //我不知道这到底是TM的什么情况  反正就是改变了
            store.ViewClassificationArray.push(Array);


            //当确定添加分类之后 project列表右面的分类总数进行增加1个 所以遍历project数组对len进行增加
            for (let i = 0; i < store.projectList.length; i++) {
                if (store.projectList[i].name == store.CurrentSelection) {
                    store.projectList[i].len++;
                }
            }




        },
        CurrentSelection(store, data) {
            store.CurrentSelection = data;

        },
        //加入当前分类内容项
        AddTheCurrentCategoryContent(store, data) {
            //data[0] 当前分类标题
            //data[1] 加入的内容对象
            for (let i = 0; i < store.ViewClassificationArray.length; i++) {
                if (store.ViewClassificationArray[i].title == data[0]) {
                    store.ViewClassificationArray[i].fenlei.push(data[1]);
                }
            }
            console.log(store.itemizedList)
        },
        //拖拽操作
        dragAndDrop(store, data) {
            let Array = {};
            for (let i = 0; i < store.ViewClassificationArray.length; i++) {
                if (store.ViewClassificationArray[i].title == data.formerClassify) {
                    for (let j = 0; j < store.ViewClassificationArray[i].fenlei.length; j++) {
                        if (store.ViewClassificationArray[i].fenlei[j].title == data.DragAndDropTitle) {
                            Array = store.ViewClassificationArray[i].fenlei[j];
                            store.ViewClassificationArray[i].fenlei.splice(j, 1);
                        }
                    }
                }
            }

            for (let i = 0; i < store.ViewClassificationArray.length; i++) {
                if (store.ViewClassificationArray[i].title == data.placeTheTitle) {
                    store.ViewClassificationArray[i].fenlei.push(Array);
                }
            }
            console.log(store.itemizedList)
        },
        //删除子项操作
        sureDeleteChild(store, data) {
            for (let i = 0; i < store.ViewClassificationArray.length; i++) {
                if (store.ViewClassificationArray[i].title == data.title) {
                    for (let j = 0; j < store.ViewClassificationArray[i].fenlei.length; j++) {
                        if (store.ViewClassificationArray[i].fenlei[j].title == data.childTitle && store.ViewClassificationArray[i].fenlei[j].content == data.content) {
                            store.ViewClassificationArray[i].fenlei.splice(j, 1);
                        }
                    }
                }
            }
            console.log(store.itemizedList)
        },

        //删除整个项目
        deleteProject(store, data) {
            for (let i = 0; i < store.itemizedList.length; i++) {
                if (store.itemizedList[i].cont == data) {
                    store.itemizedList.splice(i, 1);
                }
            }
            for (let i = 0; i < store.projectList.length; i++) {
                if (store.projectList[i].name == data) {
                    store.projectList.splice(i, 1)
                }
            }
            store.ViewClassificationArray = []

        },

        //发布评论
        addComment(store, data) {
            let obj = {
                user_name: data.user_name,
                comment: data.content,
            }
            console.log(store.ViewClassificationArray);
            //寻找 title标题 因为每个项目每个卡片标题不能重复所以好寻找
            for (let i = 0; i < store.ViewClassificationArray.length; i++) {
                // if(store.ViewClassificationArray[i].title==data.title){

                // }
                for (let j = 0; j < store.ViewClassificationArray[i].fenlei.length; j++) {
                    if (store.ViewClassificationArray[i].fenlei[j].title == data.title) {
                        store.ViewClassificationArray[i].fenlei[j].comments.push(obj)
                    }
                }
            }
        },

        //传送用户数据
        changeJurisdiction(state, data) {
            state.jurisdiction = data[0].login //是不是管理员
            state.login = 999;
            console.log(data[0].img)
            state.img = data[0].img //头像
            state.username = data[1];
        },

        //发送到日志中
        pushJournal(store, data) {
            //这个是加入
            for (let i = 0; i < store.journalList.length; i++) {
                if (store.journalList[i].date == data.date) {
                    store.journalList[i].caozuo.unshift(data.array)
                }
            }
        },
        GetJournalInfo(store, data) {
            store.journalList = data;
        }
    }

})