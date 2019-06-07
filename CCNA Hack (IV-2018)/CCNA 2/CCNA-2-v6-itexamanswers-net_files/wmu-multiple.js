jQuery(document).ready(function(e){function a(e,a){var t=null,i="";return null!==(t="image"==a?e.attr("id").match(/wmu\-\d+\_\d+\-image\-(\d+)/):"video"==a?e.attr("id").match(/wmu\-\d+\_\d+\-video\-(\d+)/):e.attr("id").match(/wmu\-\d+\_\d+\-file\-(\d+)/))&&(i=t[1]),i}function t(){1==wpdiscuzAjaxObj.wpdiscuz_options.wmuIsLightbox&&e(".wmu-attached-image-link").colorbox({maxHeight:"95%",maxWidth:"95%",rel:"wmu-attached-image-link"})}if(e(".wmu_reset").val(""),t(),e(document).delegate(".wmu-multiple","click",function(){var a=e(this).children(".wmu-type").val(),t=e(this).parents(".wpdiscuz-textarea-foot"),i=e(".wmu-"+a+"-tab",t);e(".wmu-tabs:not('.wmu-"+a+"-tab')",t).removeClass("wmu-show"),i.toggleClass("wmu-show"),e(".wmu-multiple.wmu-active").removeClass("wmu-active"),e(this).toggleClass("wmu-active"),i.is(":visible")||e(this).removeClass("wmu-active")}),e(document).delegate(".wmu-image","change",function(){var t=e(this),i=a(t,"image"),s=t.parents(".wc_comm_form"),m=e(".wmu-preview-image-"+i,s),u=s.find(".wpdiscuz_unique_id").val(),r=e("#image-"+u+"-canvas-"+i).get(0),n=e("img",m),o=t[0].files?t[0].files:[],w=o[0].name;if(o.length)if(t.parents(".wmu-add-"+i,".wmu-tabs").removeClass("wmu-show"),m.addClass("wmu-show"),m.attr("title",w),window.FileReader){var d=new FileReader;d.readAsDataURL(o[0]),d.onloadend=function(){e(n).attr("src",this.result),EXIF.getData(o[0],function(){!function(e,a){var t=a.getContext("2d"),i="",s=e.width,m=e.height;EXIF.getData(e,function(){var e=EXIF.getAllTags(this);i=e.Orientation}),jQuery.inArray(i,[5,6,7,8])>-1?(a.width=m,a.height=s):(a.width=s,a.height=m);switch(i){case 2:t.transform(-1,0,0,1,s,0);break;case 3:t.transform(-1,0,0,-1,s,m);break;case 4:t.transform(1,0,0,-1,0,m);break;case 5:t.transform(0,1,1,0,0,0);break;case 6:t.transform(0,1,-1,0,m,0);break;case 7:t.transform(0,-1,-1,0,m,s);break;case 8:t.transform(0,-1,1,0,0,s);break;default:t.transform(1,0,0,1,0,0)}t.drawImage(e,0,0,s,m)}(n.get(0),r)})}}else e(n).replaceWith('<div class="wmu-filreader-not-exist">'+o[0].name+"</div>")}),e(document).delegate(".wmu-video","change",function(){var t=e(this),i=a(t,"video"),s=t.parents(".wc_comm_form"),m=e(".wmu-preview-video-"+i,s),u=e(".wmu-preview-video-"+i+" .wmu-preview-remove .wmu-file-name",s),r=e("img",m),n=t[0].files?t[0].files:[],o=n[0].name;n.length&&(e(r).attr("src",wpdiscuzAjaxObj.wpdiscuz_options.iconVideoAudio),t.parents(".wmu-add-"+i,".wmu-tabs").removeClass("wmu-show"),m.addClass("wmu-show"),m.attr("title",o),o.length>30&&(o="..."+o.slice(-30)),u.html(o))}),e(document).delegate(".wmu-file","change",function(){var t=e(this),i=a(t,"file"),s=t.parents(".wc_comm_form"),m=e(".wmu-preview-file-"+i,s),u=e(".wmu-preview-file-"+i+" .wmu-preview-remove .wmu-file-name",s),r=e("img",m),n=wpdiscuzAjaxObj.wpdiscuz_options.iconFile,o=t[0].files?t[0].files:[],w=o[0].name;o.length&&(t.parents(".wmu-add-"+i,".wmu-tabs").removeClass("wmu-show"),m.addClass("wmu-show"),m.attr("title",o[0].name),r.attr("src",n),w.length>30&&(w="..."+w.slice(-30)),u.html(w))}),e(document).delegate(".wmu-attachment-delete","click",function(a){if(confirm(wpdiscuzAjaxObj.wpdiscuz_options.confirmDelete)){e(".wpdiscuz-loading-bar").show();var t=new FormData,i=e(this),s=function(e){var a=e.attr("id").match(/wmu\-attach\-remove\-(\d+)/),t=0;null!==a&&(t=a[1]);return t}(i),m=i.parents(".wc-comment-right").attr("id"),u=m.substring(m.lastIndexOf("-")+1),r="";r=i.hasClass("wmu-delete-image")?"image":i.hasClass("wmu-delete-video")?"video":"file",s>0?(t.append("action","removeAttachment"),t.append("commentId",u),t.append("attachmentId",s),t.append("metaKey",r),e.ajax({type:"POST",url:wpdiscuzAjaxObj.url,data:t,contentType:!1,processData:!1}).done(function(a){try{var t=e.parseJSON(a);null!=t&&""!=t&&t.id>0&&e(".wmu-attachment-"+t.id).remove()}catch(e){console.log(e)}e(".wpdiscuz-loading-bar").hide()})):console.log("Cannot get attachment id")}else console.log("canceled")}),e(document).delegate(".wmu-preview","click",function(){var a=e(this),t=e(a).parents(".wmu-tabs"),i="",s=function(e,a){var t=null,i="";t="image"==a?e.attr("class").match(/wmu\-preview\-image\-(\d+)/):"video"==a?e.attr("class").match(/wmu\-preview\-video\-(\d+)/):e.attr("class").match(/wmu\-preview\-file\-(\d+)/);null!==t&&(i=t[1]);return i}(a,i=e(a).hasClass("wmu-preview-image")?"image":e(a).hasClass("wmu-preview-video")?"video":"file"),m=e(a).parents("form").find(".wpdiscuz_unique_id").val(),u=e(".wmu-add-"+s+" #wmu-"+m+"-"+i+"-"+s,t);e("img",a).attr("src",""),e(a).removeClass("wmu-show"),e(".wmu-add-"+s,t).addClass("wmu-show"),e(u).replaceWith('<input id="wmu-'+m+"-"+i+"-"+s+'" class="wmu-'+i+' wmu_reset wmu-hide" type="file" name="wmu_'+i+'[]"/>')}),wpdiscuzAjaxObj.wmuAddLightBox=function(){1==wpdiscuzAjaxObj.wpdiscuz_options.wmuIsLightbox&&e(".wmu-attached-image-link").colorbox({maxHeight:"95%",maxWidth:"95%",rel:"wmu-attached-image-link"})},wpdiscuzAjaxObj.wmuHideAll=function(a,i){parseInt(a)>=0?(e(".wmu-tabs",i).removeClass("wmu-show"),e(".wmu-preview",i).removeClass("wmu-show"),e(".wmu-preview img",i).attr("src",""),e.each(e(".wmu-add",i),function(){e(this).hasClass("wmu-show")||e(this).addClass("wmu-show")}),e(".wmu_reset",i).val(""),e(".wmu-multiple",i).removeClass("wmu-active"),t()):console.log("error occured while posting comment")},wpdiscuzAjaxObj.wpdiscuz_options.wmuLazyLoadImages&&(wpdiscuzAjaxObj.wmuImagesInit=function(){for(var a=e("img"),t=0;t<a.length;t++){var i=e(a[t]),s=i.attr("wmu-data-src");s&&i.attr("src",s)}}),wpdiscuzAjaxObj.wpdiscuz_options.wmuLazyLoadImages){!function(){for(var a=e("img"),t=0;t<a.length;t++){var i=e(a[t]),s=i.attr("wmu-data-src");s&&i.attr("src",s)}}()}});