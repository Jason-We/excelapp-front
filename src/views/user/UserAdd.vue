<template>
   <v-form class="form-user" ref="form" v-model="valid" :lazy-validation="lazy">
      <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

      <v-text-field v-model="sex" :rules="[v => !!v || 'Sex is required']" label="Sex" required></v-text-field>

      <v-text-field v-model="phone" :rules="[v => !!v || 'phone is required']" label="Phone" required>
      </v-text-field>

      <v-text-field v-model="others" :rules="[v => !!v || 'others is required']" label="Others" required>
      </v-text-field>

      <v-btn color="primary" class="mr-4" @click="reset">
         Reset Form
      </v-btn>
      <v-btn color="success" class="mr-4" @click="addUser">
         Submit
      </v-btn>
   </v-form>

</template>

<script>
   export default {
      name: 'UserAdd',
      data() {
         return {
            valid: true,
            lazy: false,
            users: {},
            name: "",
            nameRules: [
               v => !!v || 'Name is required',
               v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            sex: "",
            phone: "",
            others: "",
         }
      },
      methods: {
         addUser() {
            const that = this;
            this.axios.post('/user/add', {
               name: this.name,
               sex: this.sex,
               phone: this.phone,
               others: this.others
            })
               .then(function (response) {
                  if (response.data === 1) {
                     alert("添加用户成功");
                     that.$refs.form.reset();
                     that.getAllusers();
                  } else {
                     alert("添加用户失败！");
                  }

               })
               .catch(function (error) {
                  console.log(error);
               });

         },
         getAllusers() {
            const that = this;
            this.axios.get('/user/getAll/').then(function (res) {
               console.log(res.data);
               that.users = res.data;
            })
         },
         reset() {
            this.$refs.form.reset()
         },
      },
   }
</script>
<style scoped>
   .form-user {
      padding: 15px 20px;
   }

   v-text-field {
      max-width: 500px;
   }
</style>