<template>
  <div>
    <h1>This is a home page</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',

  mounted: function () {
    console.log('Mounted');
    window.opener.gotOAuthInfo('hello');
    window.close();
  }
};
</script>
