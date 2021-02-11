$(function () {


	if ($("#birthday") && $("#birthday").length) {
		$('#birthday').datetimeEntry({datetimeFormat: 'D/O/Y', spinnerBigImage: '/datetimeentry/spinnerDefaultBig.png'});
	}


	//duplicator
	if ($(".duplicator") && $(".duplicator").length) {
		$(".duplicator").on("click", function () {
			console.log($(this).data("duplicate"));
			var list = $("#"+$(this).data("duplicate"));
			var clone = $($("#"+$(this).data("duplicate")+" .mb-3")[0]).clone();
			console.log(list);
			console.log(clone);
			clone.find('input').each(function() {
				this.name= this.name.replace('[0]', '['+(list.length+1)+']');
				this.value = "";
			});
			list.append(clone);
			addAddressAutocomplete();
		});
	}
	// UPLOAD IMAGE
	if ($("#formupload") && $("#formupload").length) {
		$("#image-preview").on( "click", function () {
			$("#image-preview").addClass("d-none");
			$("#formupload").removeClass("d-none");
			$(".enableBorder").removeClass("d-none");
		});
		var tpl = '<div class="dz-preview dz-file-preview">';
		tpl+= '  <div class="dz-details">';
		//tpl+= '    <div class="dz-filename"><span data-dz-name></span></div>';
		//tpl+= '    <div class="dz-size" data-dz-size></div>';
		tpl+= '    <img class="img-fluid" data-dz-thumbnail />';
		tpl+= '  </div>';
		tpl+= '  <div class="dz-progress progress mt-2 mb-2"><span class="dz-upload progress-bar progress-bar-striped bg-success" role="progressbar" data-dz-uploadprogress></span></div>';
		//tpl+= '  <div class="dz-success-mark"><span>✔</span></div>';
		//tpl+= '  <div class="dz-error-mark"><span>✘</span></div>';
		tpl+= '  <div class="dz-error-message"><span data-dz-errormessage></span></div>';
		tpl+= '  <div class="data-dz-remove"><button class="btn btn-primary">TRY AGAIN</button></div>';
		tpl+= '</div>';
		if (dropzone) dropzone = null;
		var dropzone = $("#formupload").dropzone({ 
			url: "/admin/api/"+get.sez+"/"+get.id+"/image",
			paramName: "image", // The name that will be used to transfer the file
			maxFilesize: 2, // MB
			acceptedFiles: "image/*",
			autoProcessQueue: true,
			addRemoveLinks: false,
			thumbnailWidth: 400,
			thumbnailHeight:400,
			previewTemplate: tpl,
			init: function () {
				this.on("addedfile", function(file) { 
					$(".enableBorder").addClass("d-none");
					var dz = this
					file.previewElement.addEventListener("click", function() {
						console.log("click")
						dz.removeFile(file);
					});
				});
				this.on("removedfile", function(file) {
					$("#image-preview").removeClass("d-none");
					$("#formupload").addClass("d-none");
				});
				this.on("success", function(file) {
					//$(".dz-error-message").html('<div class="alert alert-danger">'+error.errors.image[0].err+'</div>');
				});
				this.on("error", function(file, error) {
					console.log(error.errors.image[0].err)
					$(".progress-bar").css('width', '0');
					$(".dz-error-message").html('<div class="alert alert-danger">'+error.errors.image[0].err+'</div>');
				});
			}
		});
	}

	if ($("#slug") && $("#slug").length) {
		$('#slug').on( "keyup", function () {
	console.log(this)
	if ($('#slug').val().length>2) {
		var target = $('#slug').parent().parent().find(".error-message")
		$.ajax({
			url: "/admin/api/"+get.sez+"/"+get.id+"/"+get.form+"/slugs/"+$('#slug').val(),
			method: "get"
		}).done((data) => {
			if (data.exist && data.slug!=slug) {
				$(target).html("stocazzaaao")
			} else {
				$(target).html("");
			}
			console.log(data.exist);
			console.log(slug);
		});
	}
		});
	}

	if ($(".location-search-input") && $(".location-search-input").length) {
		addAddressAutocomplete = function () {
			$(".location-search-input")
			.geocomplete({
				fields: ["address_components", "geometry"]
			})
			.bind("geocode:result", (event, place) => {
				console.log(event.target);
				var res = {
					"geometry": {
						"lat": place.geometry.location.lat(),
						"lng": place.geometry.location.lng()
					},
					"locality": "",
					"country": "",
					"formatted_address": ""
				}
				console.log(place)
				console.log(place.geometry.location.lat())
				console.log(place.geometry.location.lng())
				for(var item in place.address_components) {
					if (place.address_components[item].types.indexOf("country")!==-1) {
						res.country = place.address_components[item].long_name
					}
					if (place.address_components[item].types.indexOf("locality")!==-1) {
						res.locality = place.address_components[item].long_name
					}
				}
				if (res.locality=="") {
					for(var item in place.address_components) {
						if (place.address_components[item].types.indexOf("administrative_area_level_3")!==-1) {
							res.locality = place.address_components[item].long_name
						}
					}
				}
				res.formatted_address = res.locality && res.country ? res.locality +", "+ res.country : res.locality ? res.locality : res.country ? res.country : "";
				event.target.value = res.formatted_address
				$(event.target).parent().find(".lat").val(res.geometry.lat)
				$(event.target).parent().find(".lng").val(res.geometry.lng)
				$(event.target).parent().find(".locality").val(res.locality)
				$(event.target).parent().find(".country").val(res.country)
				console.log(res);
			});
		}
		addAddressAutocomplete();
	}
});
