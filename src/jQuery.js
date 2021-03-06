//jQuery是一个不需要加new的构造函数
window.$ = window.jQuery = function(selectorOrArrayOrTemplate) {
    let elements;
    if (typeof selectorOrArrayOrTemplate === "string") {
      if (selectorOrArrayOrTemplate[0] === "<") {
        // 创建 div
         elements = [createElement(selectorOrArrayOrTemplate)];
          //构造出来的对象（jQuery对象）可以操作elements，不return elements，return它构造出来的对象（jQuery对象）
          } else {
         // 查找 div
         elements = document.querySelectorAll(selectorOrArrayOrTemplate);
          }
        } else if (selectorOrArrayOrTemplate instanceof Array) {
          elements = selectorOrArrayOrTemplate;
    }

    function createElement(string) {
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    }
    // api 可以操作elements
    const api = Object.create(jQuery.prototype)// 创建一个对象，这个对象的 __proto__ 为括号里面的东西
    Object.assign(api, {
        elements: elements,
        oldApi: selectorOrArrayOrTemplate.oldApi
    });
    //api.elements: elements;
    //api.oldApi: selectorOrArray.oldApi;//之前仅放在array身上，现在需要放到api身上，这样end()才能返回
    return api;
}; 

jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    jQuery: true,
    get(index){
        return this.elements[index];
    },
    appendTo(node) {
        if (node instanceof Element) {
          this.each(el => node.appendChild(el));// 遍历 elements，对每个 el 进行 node.appendChild 操作
        } else if (node.jquery === true) {
          this.each(el => node.get(0).appendChild(el));// 遍历 elements，对每个 el 进行 node.get(0).appendChild(el))  操作
        }
    },
    append(children) {
        if (children instanceof Element) {
          this.get(0).appendChild(children);
        } else if (children instanceof HTMLCollection) {
          for (let i = 0; i < children.length; i++) {
            this.get(0).appendChild(children[i]);
          }
        } else if (children.jquery === true) {
          children.each(node => this.get(0).appendChild(node));
        }
    },
    find(selector){
        let array = [];
        for(let i=0; i<this.elements.length; i++){
            const elements2 = Array.from(this.elements[i].querySelectorAll(selector));
            array = array.concat(this.elements2);
        }
        array.oldApi = this; //this就是api
        return jQuery(array);//jQuery(array)为了得到新的api对象用来操作array
    },
    each(fn){
        for(let i=0; i<this.elements.length; i++){
            fn.call(null, this.elements[i], i);
        }
        return this;
    },
    parent(){
        const array = [];
        this.each((node)=>{
            if(array.indexOf(node.parentNode) === -1){//-1就是不在数组里面
                array.push(node.parentNode);
            }
        });
        return jQuery(array);//jQuery(array)为了得到新的api对象用来操作array
    },
    children(){
        const array = [];
        this.each((node)=>{
                array.push(...node.children);//...是展开操作符
        });
        return jQuery(array);//jQuery(array)为了得到新的api对象用来操作array
    },
    print(){
        console.log(this.elements);//elements就是对应的元素们
    },
    addClass(className){//遍历所有获取到的元素，在class中添加className
        //闭包：函数访问外部的变量
        for (let i = 0; i < this.elements.length; i++) {
            const element = this.elements[i];
            element.classList.add(className);
        }
        return this;
    },
    end(){
        return this.oldApi
    }
}