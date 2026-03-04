(function (window, $) {
  'use strict';

  if (!$ || !$.fn || !$.fn.DataTable) {
    return;
  }

  const defaultOptions = {
    paging: true,
    searching: true,
    ordering: true,
    info: true,
    lengthMenu: [10, 25, 50, 100],
    language: {
      url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
    }
  };

  window.initDataTableStd = function (selector, extraOptions) {
    const options = $.extend(true, {}, defaultOptions, extraOptions || {});

    $(selector).each(function () {
      const $table = $(this);
      if ($.fn.DataTable.isDataTable(this)) {
        return;
      }
      $table.DataTable(options);
    });
  };

  $(function () {
    const selector = 'table.datatable-std';

    $('table.table').each(function () {
      const table = this;
      if (table.classList.contains('datatable-skip')) return;
      if (!table.querySelector('thead') || !table.querySelector('tbody')) return;
      if (table.querySelector('tbody input, tbody select, tbody textarea, tbody button')) return;
      table.classList.add('datatable-std');
    });

    window.initDataTableStd(selector);
  });
})(window, window.jQuery);
