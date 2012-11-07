getCategories(0);

function ParseCats(strData) {
	if (strData) {
		//Parse json data
		var dataObj = jQuery.parseJSON(strData);
		var writeLine = "";

		$.each(dataObj.Category, function(i, val) {
			writeLine = '<div class="Level1" level="1" id="' + dataObj.Category[i].SubCatId + '"><div class="catMasterBox">+</div>' + dataObj.Category[i].SubCatName  +
						'<div class="clearfix"></div></div>' + '<div class="sub" id="' + dataObj.Category[i].SubCatId  + '-sub"></div>';
			$('#dropdown').append(writeLine);
		});

	}
}
$('.Level1').live({
	click: function(){
		var CurId = $(this).attr('id');
		$('#' + CurId + '-sub').html('');
		if ($('#' + CurId + '-sub').is(":hidden")) {
			$('.sub').slideUp();
			$('#' + CurId + '-sub').slideDown();
		}
		else {
			$('#' + CurId + '-sub').slideUp();
		}
		getCategories(CurId, 1);
	}
});
$('.level2').live({
	click: function() {
		var len = $(this).parents("div").length;
		var hlen = len - 1;
		var CurId = $(this).attr('id');
		if ($('#' + CurId + '-sub').is(':hidden')) {
			$('.level-' + hlen).slideUp();
			$('#' + CurId + '-sub').slideDown();
		}
		else {
			$('#' + CurId + '-sub').slideUp();
		}
		$('#' + CurId + '-sub').html('');
		$('#' + CurId + '-sub').css('marginLeft', len+10 +'px');
		getCategories(CurId, len);
	}
});
$('.level').live({
	click: function() {
		var len = $(this).parents("div").length;
		var hlen = len - 1;
		var CurId = $(this).attr('id');
		$('#' + CurId + '-sub').slideUp();
		ChangeItems(CurId);
	}
});

function ParseSubCats(strData, CurId, curLevel) {
	if (strData) {
		//Parse json data
		var dataObj = jQuery.parseJSON(strData);
		var writeLine = "";
		var plussign;
		var curClass;

		$.each(dataObj.Category, function(i, val) {
			plussign = (dataObj.Category[i].SubExist == 'True') ? "+" : "";
			curClass = (dataObj.Category[i].SubExist == 'True') ? "level2" : "level";
			writeLine = '<div class="' + curClass + '" id="' + dataObj.Category[i].SubCatId + '"><div>' + plussign + ' ' + dataObj.Category[i].SubCatName  +
						'</div><div class="clearfix"></div></div><div style="display:none;" class="level-' + curLevel + '" id="' + dataObj.Category[i].SubCatId  + '-sub"></div>';
			$('#' + CurId + '-sub').append(writeLine);
		});

	}
}
function getCategories(strCatId, curLevel) {
    $.ajax({
    	async: 'true',
        type: 'POST',
        url: '../ajax//GetCats.asp',
        data: {
            CatId: strCatId
        },
        success: function (data) {
            // successful request; do something with the data
            if (strCatId == 0){
            	ParseCats(data);
            }
            else {
            	ParseSubCats(data, strCatId, curLevel)
            }
        },
        error: function () {
            // failed request; give feedback to user

        }
    });

}
