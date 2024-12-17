<template>
    <div>
        <h2>Ediçao de Usuario</h2>
        <hr>
        <div class="columns is-mobile is-centered">
            <div class="column is-half">
                <div v-if="error != undefined" class="alert alert-danger mb-2">
                    <p> {{ error }}</p>
                </div>

                <p>Nome</p>
                <input class="input" type="text" placeholder="Nome do usuario" v-model="name">
                <p>E-mail</p>
                <input class="input mt-2" type="email" placeholder="E-mail" v-model="email">
                <p>Senha</p>
                <hr>
                <button class="button is-success" @click="update"> Editar </button>


            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    created() {
        const req = { //Precisa do token para essa requisicao da nossa API
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }

        axios.get("http://localhost:8686/user/" + this.$route.params.id, req).then(res => {
            this.id = res.data.id
            this.name = res.data.name
            this.email = res.data.email
        }).catch(error => {
            console.log(error.response)
            this.$router.push({ name: 'Users' }) //redirect
        })
    },
    data() {
        return {
            id: 0,
            name: '',
            email: '',
            error: undefined
        }

    },
    methods: {
        update() {
            const req = { //Precisa do token para essa requisicao da nossa API
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
            axios.put("http://localhost:8686/user", { name: this.name, email: this.email, id: this.id }, req).then(res => {
                this.$router.push({ name: 'Users' })
                console.log(res)
            }).catch((error) => {
                const msgErro = error.response.data.err
                this.error = msgErro
            })
        }
    }

}
</script>

<style>
.alert {
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    line-height: 1.5;
}

.alert-danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
}
</style>