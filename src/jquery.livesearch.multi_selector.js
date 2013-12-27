(function ($) {

  $.fn.livesearch_multi_selector = function (options) {
    options = $.extend({
      url: false,
      cancel_copy: 'Remove',
      sortable: false,
      update_input: false
    }, options);

    return $(this).each(function () {
      var $div = $(this),
        $field_with_icon = $div.find('.field_with_icon'),
        $input = $field_with_icon.find('input.text'),
        $list = $div.find('ol.search-selected,ul.search-selected'),
        $search_loading_icon = $input.siblings('.ss-search'),
        $template = $div.find('.template'),

        this_options = options,
        input_dropdown;

      this_options.url = options.url || $div.closest('form').attr('action');
      input_dropdown = $input.livesearch_input_dropdown(this_options);

      if (options.sortable) {
        $list.sortable({
          containment: 'document',
          axis: 'y',
          update: function () {
            $list.find('input.position').each(function (i) {
              $(this).val(i);
            });
          }
        });
      }

      function unselectable($li) {
        var $cancel = $('<a class="ss-icon ss-delete cancel-link" href="#">' + options.cancel_copy + '</a>');
        $li.append($cancel);
        if ($destroy.val() && $destroy.val() !== 'false') {
          $li.hide();
        }
        $cancel.click(function (e) {
          e.preventDefault();
          $li.fadeOut(function () {
            $destroy.val('1');
            if (!$destroy.length) { //new record
              $li.remove();
            }
          });
        });
      }

      function reset() {
        $input.val('');
        $field_with_icon.siblings('.results').slideUp();
        $input.trigger('livesearch:cancel');
      }

      $div.addClass('search');
      $input.attr('name', '');

      $list.find('li').each(function () {
        unselectable($(this));
      });

      $input.on('livesearch:searching', function () {
        $search_loading_icon.removeClass('ss-search').addClass('icon-loading-small');
      });

      $input.on('livesearch:results livesearch:ajax_error', function () {
        $search_loading_icon.removeClass('icon-loading-small').addClass('ss-search');
      });

      $div.on('livesearch:selected', function (e, data) {
        if (!data) { return; }
        var this_name = name.replace('[template]', '[' + $list.children('li').length + ']'),
          this_position_name = false,
          $li;
        if (position_name) {
          this_position_name = position_name.replace('[template]', '[' + $list.children('li').length + ']');
        }
        $li = $('<li>' + data[0] + '<input type="hidden" name="' + this_name + '" value="' + data[1] + '"/></li>');
        if (options.sortable) {
          if (this_position_name) {
            $li.append('<input type="hidden" class="position" name="' + this_position_name + '" />');
          }
          $list.find('input.position').each(function (i) {
            $(this).val(i);
          });
        }
        $list.append($li);
        unselectable($li);
        reset();
      });
    });
  };

}(jQuery));
