<template>
<!-- Sidebar -->
<ul
  class="navbar-nav bg-light sidebar sidebar-dark accordion"
  id="accordionSidebar"
  :class="{ toggled: sidebarToggled }"
>
  <!-- Sidebar - Brand -->
  <a
    class="sidebar-brand d-flex align-items-center justify-content-center"
    href="#"
  >
    <div class="sidebar-brand-icon mt-2">
      <!-- <img src="/img/logo.png" alt="logo" width="50" /> -->
    </div>
    <div class="sidebar-brand-text ms-3">
      <span class="text-primary">Rental PS</span>
    </div>
  </a>

  <!-- Heading -->
  <div class="sidebar-heading mt-5 text-primary">Menu</div>
  <li class="nav-item">
    <router-link
      class="nav-link text-primary"
      to="/pemesanan-ps"
      active-class="font-weight-bold text-primary active-link"
    >
      <i class="bi bi-journal-text text-primary fw-bold"></i>
      <span>Pemesanan</span>
    </router-link>
  </li>

  <!-- Divider -->
  <hr class="sidebar-divider d-none d-md-block" />
</ul>
<!-- End of Sidebar -->

</template>
