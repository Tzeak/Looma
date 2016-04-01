
        $(document).ready(function () {
            $("#timelineWhole").sortable({
            //$('#btnSave').hide();
                opacity: 0.7,
                revert: true,   //Animates
                scroll: true,   //Allows page to scroll when dragging. Good for tall pages.
                handle: $(".timelinediv"),
                update: function () {  
                	$('#btnSave').show() 
            	}
            });

        })

		
