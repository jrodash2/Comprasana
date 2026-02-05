(function () {
  const modalId = 'appAlertModal';

  const typeConfig = {
    success: { label: 'Éxito', icon: '✔', badge: 'bg-success text-white' },
    error: { label: 'Error', icon: '✖', badge: 'bg-danger text-white' },
    warning: { label: 'Advertencia', icon: '⚠', badge: 'bg-warning text-dark' },
    info: { label: 'Información', icon: 'ℹ', badge: 'bg-info text-dark' },
  };

  function ensureModal() {
    let modalEl = document.getElementById(modalId);
    if (modalEl) return modalEl;
    modalEl = document.createElement('div');
    modalEl.className = 'modal fade riho-modal';
    modalEl.id = modalId;
    modalEl.tabIndex = -1;
    modalEl.setAttribute('aria-hidden', 'true');
    modalEl.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <span class="riho-modal-badge badge" data-modal-badge></span>
              <h5 class="modal-title mt-2" data-modal-title></h5>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <div class="riho-modal-message" data-modal-body></div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-upcv-primary" data-modal-confirm>Aceptar</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modalEl);
    return modalEl;
  }

  function showAppModal({ title = 'Aviso', message = '', type = 'info', autoclose = false } = {}) {
    const modalEl = ensureModal();
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
    const config = typeConfig[type] || typeConfig.info;
    const badge = modalEl.querySelector('[data-modal-badge]');
    const titleEl = modalEl.querySelector('[data-modal-title]');
    const bodyEl = modalEl.querySelector('[data-modal-body]');
    const confirmBtn = modalEl.querySelector('[data-modal-confirm]');

    badge.className = `riho-modal-badge badge ${config.badge}`;
    badge.textContent = `${config.icon} ${config.label}`;
    titleEl.textContent = title;
    bodyEl.innerHTML = message;

    if (autoclose) {
      confirmBtn.classList.add('d-none');
    } else {
      confirmBtn.classList.remove('d-none');
    }

    confirmBtn.onclick = () => modalInstance.hide();

    modalInstance.show();

    if (autoclose) {
      setTimeout(() => modalInstance.hide(), 1600);
    }
  }

  function autoCloseModal(modalId, ms = 1600) {
    const modalEl = document.getElementById(modalId);
    if (!modalEl) return;
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
    setTimeout(() => modalInstance.hide(), ms);
  }

  window.showAppModal = showAppModal;
  window.autoCloseModal = autoCloseModal;
})();
