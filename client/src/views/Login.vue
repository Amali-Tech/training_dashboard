<template>
    <div class="form-signin" @submit.prevent="login">
        <form>
            <h1 class="h3 mb-3 fw-normal">Training Dashboard</h1>
            <h3 class="h3 mb-3 fw-normal">Please sign in</h3>

            <div class="form-floating">
                <input v-model="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
            </div>
            <br>
            <div class="form-floating">
                <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
            </div>
            <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    </div>
</template>

<script>
import router from '../router/route';
import apiUrl from '../api';

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      const { email, password } = this;
      console.log(apiUrl)

      if(email == "" || password == "") {
          alert("Email or password field is empty");
      }
      else {
            const res = await fetch(`${apiUrl.apiUrl}auth`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            this.email = "";
            this.password = "";

            const data = await res.json();

            if (data.status === "success") {

                localStorage.setItem("token", JSON.stringify(data.tkn));
                const stored = localStorage.getItem("token");
                const retrieved = JSON.parse(stored);

                retrieved.isadmin === true ? router.push("/admin") : router.push("/trainee")
            } else {
                alert(data.message);
            }
      }
    },
  },
  components: {}, 
}
</script>

<style scoped>
    .form-signin {
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: auto;
    }

    .form-signin .checkbox {
        font-weight: 400;
    }

    .form-signin .form-floating:focus-within {
        z-index: 2;
    }

    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    h1, h3 {
        text-align: center;
    }
</style>