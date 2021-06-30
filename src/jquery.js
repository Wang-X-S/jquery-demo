// window.jQuery = function (selectorOrArray) {
//     let elements
//     if (typeof selectorOrArray === 'string') {
//         elements = document.querySelectorAll(selectorOrArray)
//     } else if (selectorOrArray instanceof Array) {
//         elements = selectorOrArray
//     }

//     const api = {
//         addClass(className) {
//             for (i = 0; i < elements.length; i++) {
//                 elements[i].classList.add(className)
//             }
//             return this//用来返回这个this的位置，方便链式调用
//         },
//         find(selector) {
//             //不能用 document.querySelectorAll,因为是要在一个范围内找
//             //可以用 elements 但是 是个多元素，也可以把它当作数组，数组不可以 querySelector 的
//             //只能生成临时数组array，用新数组储存我们查找的元素
//             let array = []
//             for (let i = 0; i < elements.length; i++) {
//                 array = array.concat(Array.from(elements[i].querySelectorAll(selector)))
//                 //array = array+ elements2
//                 //在 elements 中找到所有匹配selectorOrArray的元素，然后把元素放到 array中
//             }
//             array.oldApi = this

//             const newApi = jQuery(array)
//             return newApi
//         },
//         end() {
//             console.log(this)
//             return this.oldApi

//         },
//         each(fn) {
//             for (let i = 0; i < elements.length; i++) {
//                 fn.call(null, elements[i], i)
//             }
//             return this
//         },
//         parent() {
//             const array = []
//             this.each((node) => {
//                 if (array.indexOf(node.parentNode) === -1) {
//                     array.push(node.parentNode)
//                 }
//             })
//             return jQuery(array)
//         },
//         children(){
//             const array = []
//             this.each((node)=>{
//                 array.push(...node.children)
//             })
//         }

//     }
//     return api //返回这个对象来调用里面的api，而不是返回调用的元素
// }

 window.jQuery = function (selectorOrArray) {
    let elements
    if (typeof selectorOrArray === 'string') {
        elements = document.querySelectorAll(selectorOrArray)
    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray
    }
    const api = Object.create(jQuery.prototype)//创建一个对象，这个对象的__proto__为括号里的东西
    //const api = {__proto__: jQuery.prototype}
    // api.elements=elements
    // api.oldApi = selectorOrArray.oldApi//接收find中的 oldApi ，让end()接收\
    // //上面两行相当于下面这个代码
    Object.assign(api,{
        elements: elements,
        oldApi: selectorOrArray.oldApi
    })

    return api
    }

jQuery.prototype={
    constructor: jQuery,
    addClass(className) {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].classList.add(className)
        }
        return this
    },
    find(selectorOrArray) {
        let array = []
        for (let i = 0; i < this.elements.length; i++) {
            array = array.concat(Array.from(this.elements[i].querySelectorAll(selectorOrArray)))
        }
        array.oldApi = this  //将api.find()的api保存下来，让end()函数可以返回到
        return jQuery(array)
    },
   
    end() {
        return this.oldApi
    },
    each(fn) {
        for (let i = 0; i < this.elements.length; i++) {
            fn.call(null, this.elements[i], i)
        }
        return this
    },
    parent() {
        const array = [];
        this.each((node) => {
            if (array.indexOf(node.parentNode) === -1) {
                array.push(node.parentNode);
            }
        });
        return jQuery(array);
    },
    children() {
        const array = []
        this.each((node) => {
            array.push(...node.children)
        })
        return jQuery(array)
    },
    siblings(node) {
        //做错，只返回当前的节点和节点之前的一个节点

        const array = []
        const siblingNodes=[]
        this.each((node)=>{
            array.push(...node.parentNode.childNodes)
            console.log(...node.parentNode.childNodes)
            return array
        })
        for(let i =0;i<array.length;i++){
            if(array[i].nodeType===1){
                siblingNodes.push(array[i])
            }
        }
        console.log(siblingNodes)
        return jQuery(siblingNodes)
    },
    print() {
        console.log(this.elements)
    }
}
//window.$ = window.jQuery //在任何地方使用 $ 相当于使用 jQuery