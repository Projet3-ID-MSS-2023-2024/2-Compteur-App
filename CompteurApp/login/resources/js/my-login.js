$(function() {
	$("input[type='password'][data-eye]").each(function(i) {
		var $this = $(this);

		$this.wrap($("<div/>", {
			style: 'position:relative'
		}));
		$this.css({
			paddingRight: 60
		});
		$this.after($("<div/>", {
			html: 'Show',
			class: 'btn btn-primary btn-sm',
			id: 'passeye-toggle-'+i,
			style: 'position:absolute;right:10px;top:50%;transform:translate(0,-50%);-webkit-transform:translate(0,-50%);-o-transform:translate(0,-50%);padding: 2px 7px;font-size:12px;cursor:pointer;'
		}));
		$this.after($("<input/>", {
			type: 'hidden',
			id: 'passeye-' + i
		}));
		$this.on("keyup paste", function() {
			$("#passeye-"+i).val($(this).val());
		});
		$("#passeye-toggle-"+i).on("click", function() {
			if($this.hasClass("show")) {
				$this.attr('type', 'password');
				$this.removeClass("show");
				$(this).removeClass("btn-outline-primary");
			}else{
				$this.attr('type', 'text');
				$this.val($("#passeye-"+i).val());				
				$this.addClass("show");
				$(this).addClass("btn-outline-primary");
			}
		});
	});
});

function removeError(event) {
	if($('#' + event.target.id).hasClass("is-invalid")) {
		$('#' + event.target.id).removeClass("is-invalid");
	}
}

function addError(event) {
	$('#' + event.target.id).addClass("is-invalid");
}

function setNickname() {
	if(!$('#nickname').val()) {
		const nickname = $('#firstName').val() + '.' + $('#lastName').val();
		$('#nickname').val(nickname.toLowerCase());
	}
}

$(document).ready(() => {
	$("#password-confirm").change((event) => {
		const password = $("#password").val();

		if(password !== $("#password-confirm").val()) {
			addError(event);
		}
	});
	
	$("#password-confirm").focus(removeError);
	
	$("#password").change((event) => {
		const regex = new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$');
	
		if(!regex.test($('#password').val())) {
			addError(event);
		}
	});

	$('#password').focus(removeError);

	$('#language-picker-dropdown').change(() => {
		var redirectUrl = $('#language-picker-dropdown').val();
   		window.location.href = redirectUrl;
	})

	$('#agreeTerms').change((event) => {
		if (!$('#agreeTerms').is(":checked")) {
			$("#registerBtn").prop('disabled', true);
		} else {
			$("#registerBtn").prop('disabled', false);
			$('#agreeTerms').val($.now());
			setNickname();
		}
	});
});
