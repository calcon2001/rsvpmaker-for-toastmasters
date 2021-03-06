jQuery(document).ready(function($) {
$("div.role-block").mouseenter(function(){
$(this).css("background-color","#EFEFEF");
});
$("div.role-block").mouseleave(function(){
$(this).css("background-color","white");
});

var menu = $('#cssmenu');
var menuList = menu.find('ul:first');
var listItems = menu.find('li').not('#responsive-tab');

// Create responsive trigger
menuList.prepend('<li id="responsive-tab"><a href="#">Menu</a></li>');

// Toggle menu visibility
menu.on('click', '#responsive-tab', function(){
	listItems.slideToggle('fast');
	listItems.addClass('collapsed');
});

    var sum = 0;
    $('.maxtime').each(function() {
        sum += Number($(this).val());
    });
	var time_limit = 0;
    $('.time_limit').each(function() {
        time_limit += Number($(this).val());
    });
	
	if((time_limit != 0) && (sum > time_limit) )
		{
		$('.time_message').html('Time reserved (all speakers): ' + sum + ' minutes <span style="color:red;">(limit:' + time_limit + ')</span>');
		}
	else if(sum > 0)
		{
		$('.time_message').html('Time reserved (all speakers): '+sum+' minutes.');
		}

// delegation code? $('.role_data').on('change', '.manual', function(){
$('.editor_assign').on('change', function(){
	var user_id = this.value;
	var id = this.id;
	var role = id.replace('editor_assign','');
	var security = $('#toastcode').val();
	$('#_manual_'+role).html(manuals_list);
	$('#_project_'+role).html('<option value="">Pick Manual for Project List</option>');
	$('#title_text'+role).val('');
	$('#_intro_'+role).val('');
	var post_id = $('#post_id').val();
	if(security && (post_id > 0))
	{
		var data = {
			'action': 'editor_assign',
			'role': role,
			'user_id': user_id,
			'security': security,
			'post_id': post_id
		};
		jQuery.post(ajaxurl, data, function(response) {
		$('#status'+role).html(response);
		$('#status'+role).fadeIn(200);
		//$('#status'+role).fadeOut(1200);
		});
	}
});

$('.manual').on('change', function(){
	var manual = this.value;
	var target = this.id.replace('manual','project');
	var list = project_list[manual];
	$('#'+target).html('<option value="">Pick a Project</option>' + list);
});

$('.project').on('change', function(){
	var project = this.value;
	var time_id = this.id.replace('project','maxtime');
	var time = project_times[project];
	$('#'+time_id).val(time);

	if(this.id.indexOf('Backup') > -1)
		return;

    var sum = 0;
    $('.maxtime').each(function() {
        sum += Number($(this).val());
    });
	
	if((time_limit != 0) && (sum > time_limit) )
		{
		alert('This choice would push the time requirement for speeches to ' + sum + ' minutes (normal limit:' + time_limit + ').\n\nYou may need to speak to club and meeting organizers about adjusting the agenda.\n\nYou can also manually adjust the Time Required field if you do not need the maximum time specified by the manual.');
		$('.time_message').html('Time reserved (all speakers): ' + sum + ' minutes <span style="color: red;">(limit:' + time_limit + ')</span>');
		}
	else if(sum > 0)
		$('.time_message').html('Time reserved (all speakers): '+sum+' minutes.');

});

$('.moremeetings').hide();
$('#showmore').click( function() {
$('.moremeetings').slideDown();
$('#showmore').hide();
});

$( ".tm_edit_detail" ).submit(function( event ) {
 
  // Stop form from submitting normally
  event.preventDefault();
 
  // Get some values from elements on the page:
  var $form = $( this );
  var status = $(this).attr('status');

	data = $form.serialize();
	jQuery.post(ajaxurl, data, function(response) {
	$('#form'+status).html(response);
	$('#delete'+status).html('');
	});
 
});

$( ".delete_tm_detail" ).click(function( event ) {
 
  // Stop form from submitting normally
  event.preventDefault();
 
  // Get some values from elements on the page:
  var key = $(this).attr('key');
  var status = $(this).attr('status');
  var user_id = $('#user_id_'+status).val();

	data = {
     action: "delete_tm_detail",
     user_id: user_id,
	 key: key
	};
	
	jQuery.post(ajaxurl, data, function(response) {
	$('#form'+status).html(response);
	$('#delete'+status).html('');
	});

});

});
