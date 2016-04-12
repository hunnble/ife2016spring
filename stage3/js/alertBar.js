/*
 * UI组件之弹出层
 * author: hunnble
 * version: 1.0
 * description: like React, just create Component and render it !
 *
 * how to use:
 * var alertBar = new AlertBar({
 *     targetId: 'alertBar',
 *     titleTxt: 'UI组件',
 *     contentTxt: 'UI组件之弹出窗口,4.12日',
 *     hasShader: true,
 *     isShow: true,
 *     width: 300,
 *     height: 200,
 *     drag: false,
 *     flexible: false,
 *     btns: {
 *        1: '确认',
 *        2: '取消'
 *     },
 *     className: {
 *         alertWindow: 'alertWindow',
 *         title: 'title',
 *         content: 'content',
 *         shader: 'shader',
 *         btn: 'btn'
 *     }
 * });
 *
 * incompelete functions: drag, flexible
 *
 */


/**
 * 弹出层构造函数
 * @param {Object} config
 * @return {Node} virtualDOM
 */
function AlertBar (config) {
    this.className  = config.className || {
        alertWindow: '',
        title: '',
        content: '',
        btns: {}
    };
    this.titleTxt   = config.titleTxt || 'Default title';
    this.contentTxt = config.contentTxt || 'Default content';
    this.btns       = config.btns || {};
    this.hasShader  = config.hasShader || false;
    this.isShow     = config.isShow || false;
    this.width      = config.width || 400;
    this.height     = config.height || 300;
    this.drag       = config.drag || false;
    this.flexible   = config.flexible || false;

    this.shader     = document.createElement('div');
    this.bindEvents();

    return this.render();
};

/**
 * 渲染到virtualDOM中
 */
AlertBar.prototype.render = function () {
    var shader      = this.shader,
        alertWindow = document.createElement('div'),
        title       = document.createElement('h4'),
        content     = document.createElement('p'),
        btnBar      = document.createElement('div'),
        btns        = [],
        virtualDOM  = document.createElement('div');

    shader.className             = this.className['shader'];
    shader.style.width           = '100%';
    shader.style.height          = (document.body.clientHeight + document.documentElement.clientHeight) + 'px';
    shader.style.position        = 'absolute';
    shader.style.top             = 0;
    shader.style.left            = 0;
    shader.style.display         = this.isShow ? 'block' : 'none';

    if(!this.hasShader) {
        shader.style.backgroundColor = 'inherit';
    }

    virtualDOM.appendChild(shader);

    alertWindow.className        = this.className['alertWindow'];
    alertWindow.style.width      = this.width + 'px';
    alertWindow.style.height     = this.height + 'px';
    alertWindow.style.position   = 'fixed';
    alertWindow.style.top        = window.innerHeight / 2 + 'px';
    alertWindow.style.left       = window.innerWidth / 2 + 'px';
    alertWindow.style.marginLeft = this.width / -2 + 'px';
    alertWindow.style.marginTop  = this.height / -2 + 'px';

    title.className = this.className['title'];
    title.innerHTML = this.titleTxt;

    content.className = this.className['content'];
    content.innerHTML = this.contentTxt;

    for(var key in this.btns) {
        btns[key] = document.createElement('div');
        btns[key].className = this.className['btn'];
        btns[key].innerHTML = this.btns[key];
        btnBar.appendChild(btns[key]);
    }
    btnBar.style.position = 'absolute';
    btnBar.style.right    = 0;
    btnBar.style.bottom   = 10 + 'px';

    alertWindow.appendChild(title);
    alertWindow.appendChild(content);
    alertWindow.appendChild(btnBar);
    shader.appendChild(alertWindow);

    return shader;
};

/**
 * 控制显示与隐藏的接口
 * @return {Boolean}
 */
AlertBar.prototype.toggle = function () {
    this.isShow = this.isShow ? false : true;
    this.render();
    // this.shader.style.display = this.isShow ? 'block' : 'none';
};

/**
 * 绑定有关事件(*为当前版本未实现): 点击遮罩层、拖拽(*)、放缩(*)
 */
AlertBar.prototype.bindEvents = function () {
    var self = this;

    addHandler(this.shader, 'click', function (e) {
        var target = getTarget(e);

        if(target === self.shader) {
            self.toggle();
        }
    });
};

