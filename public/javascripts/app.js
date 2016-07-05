$(document).foundation();
var ControlApi = (function(){

    function BaseApi(){
        this.controler.apply(this, arguments)
    }
    BaseApi.prototype.controler = function(opt){
        this.obj = $(opt.obj)
        this.eventFire(this.obj);
    };
    BaseApi.prototype.eventFire = function(){
        var that = this;
        this.obj.on("click", function(event){
            event.preventDefault();
           var  target = $(event.currentTarget);
            that.delFile(target, target.attr("code"))
        });
    };
    BaseApi.prototype.delFile = function(target, id){
        var that = this;
        $.get('/page/delete/' + id, {
            hi : +new Date()
        }, function(da){
            that.delReady(target)
        });
    };
    BaseApi.prototype.delReady = function(target){
        target.parent().parent().remove();
    };

    return BaseApi;

})();
new ControlApi({
   obj : '.delete'
});