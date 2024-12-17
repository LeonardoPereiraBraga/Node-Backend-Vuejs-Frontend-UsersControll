<template>
    <div>
        <h1> Painel ADM </h1>

        <table class="table">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>E-Mail</th>
                    <th>Cargo</th>
                    <th> Açoes </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ processRole(user.role) }}</td>
                    <td>
                        <router-link :to="{ name: 'UserEdit', params: { id: user.id } }"><button
                                class="button is-link is-inverted">
                                Editar</button>
                        </router-link>
                        <button class="button is-link is-inverted" @click="openModal(user.id)"> Deletar </button>
                    </td>
                </tr>

            </tbody>
        </table>
        <!-- <div class="modal is-active" classe original do bulma  -->
        <div :class="{ modal: true, 'is-active': showModal }">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">Voce realmente quer deletar esse usuario?</p>
                        <button class="card-header-icon" aria-label="more options">
                            <span class="icon">
                                <i class="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </button>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
                            iaculis mauris.
                            <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
                            <br />
                            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item" @click="hideModal()">Cancelar</a>
                        <a href="#" class="card-footer-item" @click="deleteUser()">Quero deletar</a>
                    </footer>
                </div>

            </div>
            <button class="modal-close is-large" aria-label="close" @click="hideModal()"></button>
        </div>
    </div>

</template>

<script>
import axios from 'axios'
export default {
    methods: {
        processRole: function (value) {
            if (value == 0) {
                return "Usuário comum"
            } else if (value == 1) {
                return "Admin"
            }
        },
        hideModal() {
            this.showModal = false
        },
        openModal(id) {
            this.deleteUserId = id
            this.showModal = true
        },
        deleteUser() {
            const req = { //Precisa do token para essa requisicao da nossa API
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
            axios.delete("http://localhost:8686/user/" + this.deleteUserId, req).then(res => {
                console.log(res)
                this.showModal = false
                this.users = this.users.filter(user => user.id != this.deleteUserId)
            }).catch(error => {
                console.log(error)
                this.showModal = false
            })
        }

    },
    data() {
        return {
            users: [],
            showModal: false,
            deleteUserId: -1
        }

    },
    created() {
        const req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }
        axios.get("http://localhost:8686/user", req).then(res => {
            this.users = res.data
        })
    }

}
</script>

<style></style>