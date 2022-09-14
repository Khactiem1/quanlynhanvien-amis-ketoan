<template>
  <tbody>
    <tr>
      <td>
        <div class="table-loader">
          <span></span>
        </div>
      </td>
      <td v-for="(item, index) in columns" :key="index">
        <div class="table-loader">
          <span></span>
        </div>
      </td>
      <td>
        <div class="table-loader">
          <span></span>
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <div class="table-loader">
          <span></span>
        </div>
      </td>
      <td v-for="(item, index) in columns" :key="index">
        <div class="table-loader">
          <span></span>
        </div>
      </td>
      <td>
        <div class="table-loader">
          <span></span>
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <div class="table-loader">
          <span></span>
        </div>
      </td>
      <td v-for="(item, index) in columns" :key="index">
        <div class="table-loader">
          <span></span>
        </div>
      </td>
      <td>
        <div class="table-loader">
          <span></span>
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
    },
  },
};
</script>

<style scoped>
/* Table loader */
table {
  border-collapse: collapse;
  width: 100%;
}
.table tbody td:last-child {
  border-right: none;
}
tbody td {
  padding: 0 10px;
  min-height: 44px;
  height: 44px;
  border-right: 1px dotted #c7c7c7;
  border-bottom: 1px solid #c7c7c7;
}
.table-loader span {
  width: 100%;
  height: 16px;
  display: block;
  animation: pulse-bg 1s infinite;
}
@keyframes pulse-bg {
  0% {
    background-color: #eee;
  }
  50% {
    background-color: #cfcfcf;
  }
  100% {
    background-color: #eee;
  }
}
</style>
