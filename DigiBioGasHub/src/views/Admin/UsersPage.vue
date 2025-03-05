<template>
    <IonPage>
        <NavBarComponent />
        <IonContent>
            <IonHeader>
                <IonToolbar>
                    <IonTitle class="margin-style">Users</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonGrid class="margin-style">
                <IonRow>
                    <IonCol size="2"><strong>ID</strong></IonCol>
                    <IonCol><strong>UserName</strong></IonCol>
                    <IonCol><strong>Name</strong></IonCol>
                    <IonCol><strong>Email</strong></IonCol>
                    <IonCol><strong>Phone</strong></IonCol>
                    <IonCol><strong>UserLevel</strong></IonCol>
                    <IonCol><strong>HubID</strong></IonCol>
                    <IonCol><strong>Actions</strong></IonCol>
                </IonRow>
                <IonRow v-for="user in users" :key="user.id">
                    <IonCol size="2">{{ user.id }}</IonCol>
                    <IonCol>{{ user.username }}</IonCol>
                    <IonCol>{{ user.name }}</IonCol>
                    <IonCol>{{ user.email }}</IonCol>
                    <IonCol>{{ user.phone }}</IonCol>
                    <IonCol>{{ user.userLevel }}</IonCol>
                    <IonCol>{{ user.hubID }}</IonCol>
                    <IonCol>
                        <IonButton @click="editUser(user.id)">Edit</IonButton>
                        <IonButton color="danger" @click="deleteUser(user.id)">Delete</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>

            <div class="pagination">
                <IonButton v-for="pageNumber in totalPages" :key="pageNumber" @click="goToPage(pageNumber)">
                    {{ pageNumber }}
                </IonButton>
            </div>

            <IonModal :is-open="isModalOpen" @didDismiss="closeModal">
                <div class="modal-content">
                    <h2>Edit User</h2>
                    <form @submit.prevent="saveUser">
                        <IonItem>
                            <IonLabel position="floating">Username</IonLabel>
                            <IonInput type="text" v-model="editUserData.username" required></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Name</IonLabel>
                            <IonInput type="text" v-model="editUserData.name" required></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Email</IonLabel>
                            <IonInput type="email" v-model="editUserData.email" required></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Phone</IonLabel>
                            <IonInput type="text" v-model="editUserData.phone" required></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">User Level</IonLabel>
                            <IonInput type="text" v-model="editUserData.userLevel" required></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Hub ID</IonLabel>
                            <IonInput type="text" v-model="editUserData.hubID" required></IonInput>
                        </IonItem>
                        <IonButton type="submit">Save</IonButton>
                        <IonButton color="light" @click="closeModal">Cancel</IonButton>
                    </form>
                </div>
            </IonModal>

        </IonContent>
        <FooterComponent />
    </IonPage>
</template>

<script>
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonHeader, IonButton, IonToolbar, IonTitle, IonModal, IonItem, IonLabel, IonInput } from '@ionic/vue';
import NavBarComponent from '../../components/NavBarComponent.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import axios from 'axios';

export default {
    name: 'UsersPage',
    components: {
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        IonHeader,
        IonButton,
        IonToolbar,
        IonTitle,
        IonModal,
        IonItem,
        IonLabel,
        IonInput,
        NavBarComponent,
        FooterComponent,
    },

    data() {
        return {
            users: [],
            page: Number(this.$route.query.page) || 1,
            limit: Number(this.$route.query.limit) || 25,
            totalUsers: 0,
            isModalOpen: false,
            editUserData: {
                id: '',
                username: '',
                name: '',
                email: '',
                phone: '',
                userLevel: '',
                hubID: ''
            }
        };
    },

    computed: {
        totalPages() {
            return Math.ceil(this.totalUsers / this.limit);
        }
    },

    methods: {
        async fetchUsers() {
            try {
                const url = "http://localhost:28765/getusers";
                const response = await axios.post(url, { page: this.page - 1, limit: this.limit }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
                this.users = response.data.message;
                this.totalUsers = response.data.total;
            } catch (error) {
                console.error(error);
            }
        },

        goToPage(pageNumber) {
            this.$router.push({ path: '/admin/manage-users', query: { page: pageNumber, limit: this.limit } });
        },

        async editUser(userId) {
            try {
            const url = `http://localhost:28765/getuser`;
            const response = await axios.post(url, { id: userId }, {headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
            this.editUserData = response.data.message;
            this.isModalOpen = true;
        } catch (error) {
            console.error(error);
        }
        },

        closeModal() {
            this.isModalOpen = false;
        },

        saveUser() {
            console.log('User data saved:', this.editUserData);
            this.closeModal();
        },

        deleteUser(userId) {
            console.log(`Delete user with ID: ${userId}`);
        }
    },

    watch: {
        '$route.query.page'(newPage) {
            this.page = Number(newPage) || 1;
            this.fetchUsers();
        }
    },

    mounted() {
        this.fetchUsers();
    }
};
</script>

<style scoped>
ion-col {
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

ion-button {
    margin: 0 5px;
}

.margin-style {
    margin: 0 1rem;
}

.pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 10px;
}
</style>
