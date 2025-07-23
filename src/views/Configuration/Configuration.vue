<template>
  <Sidebar>
    <template #body>
      <div class="container-fluid mt-2">
        <Card>
          <template #header>
            <h3 class="text-center">Item Dashboard</h3>
          </template>
          <div class="d-flex flex-column align-items-center">
            <img alt="Item Dashboard" class="img-fluid mb-4" />
            <p class="text-center">
              Welcome to the Item Dashboard! Here you can manage your items,
              view statistics, and more.
            </p>
          </div>
        </Card>
      </div>
    </template>
  </Sidebar>
</template>

<script lang="ts" setup></script>
