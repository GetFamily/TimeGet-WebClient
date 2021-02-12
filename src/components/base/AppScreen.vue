<template>
  <div class="app-screen">
    <slot></slot>
  </div>
</template>

<style>
.app-screen{
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>