<template>
    <IonPage>
        <NavBarComponent />
        <IonContent>
            <IonHeader>
                <IonToolbar>
                    <IonTitle class="margin-style">{{ $t('admin.users.title') }}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonGrid class="margin-style">
                <IonRow>
                    <IonCol><strong>{{ $t('general.username') }}</strong></IonCol>
                    <IonCol><strong>{{ $t('general.name') }}</strong></IonCol>
                    <IonCol><strong>{{ $t('general.email') }}</strong></IonCol>
                    <IonCol><strong>{{ $t('general.phone') }}</strong></IonCol>
                    <IonCol><strong>{{ $t('admin.users.userlevel') }}</strong></IonCol>
                    <IonCol><strong>{{ $t('admin.users.isPremiumUser') }}</strong></IonCol>
                    <IonCol><strong>{{ $t('admin.users.hubID') }}</strong></IonCol>
                    <IonCol><strong>{{ $t('admin.users.actions') }}</strong></IonCol>
                </IonRow>
                <IonRow v-for="user in users" :key="user.id">
                    <IonCol>{{ user.username }}</IonCol>
                    <IonCol>{{ user.name }}</IonCol>
                    <IonCol>{{ user.email }}</IonCol>
                    <IonCol>{{ user.phone }}</IonCol>
                    <IonCol>{{ user.userlevel }}</IonCol>
                    <IonCol>{{ user.isPremiumUser }}</IonCol>
                    <IonCol>{{ user.hubID }}</IonCol>
                    <IonCol>
                        <IonButton @click="editUser(user.id)">{{ $t('general.edit') }}</IonButton>
                        <IonButton color="success" @click="openGiftModal(user)"> {{ $t('premium.giftNow') }}</IonButton>
                        <IonButton color="danger" @click="confirmDelete(user.id)">{{ $t('general.delete') }}</IonButton>
                        <IonButton v-if="user.isPremiumUser" color="primary" @click="confirmCancleSubscription(user.id)">{{ $t('premium.cancelSubscription') }}</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>

            <div class="pagination">

                <IonItem>
                    <IonLabel>{{ $t('admin.users.pagination') }}:</IonLabel>
                    <IonSelect v-model="limit">
                        <IonSelectOption v-for="option in [5, 25, 50, 75, 100]" :key="option" :value="option">
                            {{ option }}
                        </IonSelectOption>
                    </IonSelect>
                </IonItem>

                <IonButton v-for="pageNumber in totalPages" :key="pageNumber" @click="changePage(pageNumber)"
                    :class="{ 'selected': pageNumber === page }">
                    {{ pageNumber }}
                </IonButton>
            </div>

            <IonModal :is-open="isModalOpen" @didDismiss="closeModal">
                <div class="modal-content">
                    <h2>{{ $t('admin.users.editTitle') }}</h2>
                    <form @submit.prevent="saveUser">
                        <IonItem>
                            <IonLabel position="floating">{{ $t('general.username') }}</IonLabel>
                            <IonInput type="text" v-model="editUserData.username" required></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">{{ $t('general.name') }}</IonLabel>
                            <IonInput type="text" v-model="editUserData.name" required></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">{{ $t('general.email') }}</IonLabel>
                            <IonInput type="email" v-model="editUserData.email" required></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">{{ $t('general.phone') }}</IonLabel>
                            <IonInput type="text" v-model="editUserData.phone" required></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">{{ $t('admin.users.userlevel') }}</IonLabel>
                            <IonInput type="text" v-model="editUserData.userlevel" required></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">{{ $t('admin.users.hubID') }}</IonLabel>
                            <IonInput type="text" v-model="editUserData.hubID" required></IonInput>
                        </IonItem>
                        <IonButton type="submit">{{ $t('general.save') }}</IonButton>
                        <IonButton color="light" @click="closeModal">{{ $t('general.cancel') }}</IonButton>
                    </form>
                </div>
            </IonModal>

            <ToastComponent ref="toastComponent" />

            <ion-alert :is-open="showDeleteAlert" :header="$t('account.deleteAccount')"
                :message="$t('account.deleteAccountConfirm')" :buttons="[
                    {
                        text: $t('general.cancel'),
                        role: 'cancel',
                        handler: () => {
                            this.showDeleteAlert = false;
                        }
                    },
                    {
                        text: $t('general.delete'),
                        handler: () => {
                            deleteUser(userIdToDelete);
                            this.showDeleteAlert = false;
                        }
                    }
                ]"></ion-alert>
            

            <ion-alert :is-open="showSubscriptionAlert" :header="$t('premium.cancelSubscription')"
                :message="$t('premium.cancelSubscriptionConfirm')" :buttons="[
                    {
                        text: $t('general.cancel'),
                        role: 'cancel',
                        handler: () => {
                            this.showSubscriptionAlert = false;
                        }
                    },
                    {
                        text: $t('general.confirm'),
                        handler: () => {
                            cancelSubscription(userIdToCancel);
                            this.showSubscriptionAlert = false;
                        }
                    }
                ]"></ion-alert>

            <GiftPremiumComponent :isOpen="isGiftModalOpen" :user="selectedGiftUser" @close="closeGiftModal"
                @gifted="handleGifted" />

            <FooterComponent />
        </IonContent>

    </IonPage>
</template>

<script>
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonHeader, IonButton, IonToolbar, IonTitle, IonModal, IonItem, IonLabel, IonInput, IonAlert, IonList, IonSelect, IonSelectOption } from '@ionic/vue';
import ToastComponent from '../../components/ToastComponent.vue';
import GiftPremiumComponent from '../../components/GiftPremiumComponent.vue';
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
        IonSelectOption,
        IonInput,
        IonAlert,
        IonList,
        IonSelect,
        ToastComponent,
        NavBarComponent,
        GiftPremiumComponent,
        FooterComponent,
    },

    data() {
        return {
            users: [],
            page: Number(this.$route.query.page) || 1,
            limit: Number(this.$route.query.limit) || 25,
            totalUsers: 0,
            isModalOpen: false,
            showDeleteAlert: false,
            showSubscriptionAlert: false,
            editUserData: {
                id: '',
                username: '',
                name: '',
                email: '',
                phone: '',
                userlevel: '',
                hubID: ''
            },
            selectedGiftUser: null,
            isGiftModalOpen: false
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
                const url = this.$api_add + "/admin/getlimitedusers";
                const response = await axios.post(url, { page: this.page - 1, limit: this.limit }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
                this.users = response.data.message;
                this.totalUsers = response.data.total;
            } catch (error) {
                console.error(error);
                this.$refs.toastComponent.showToast(this.$t('admin.users.fetchUsersFail'), 2000, 'danger');

            }
        },

        changePage(pageNumber) {
            if (this.page !== pageNumber) {
                this.page = pageNumber;
                this.$router.replace({ path: '/admin/manage-users', query: { page: this.page, limit: this.limit } });
                this.fetchUsers();
            }
        },

        async editUser(userId) {
            try {
                const url = this.$api_add + `/getuser`;
                const response = await axios.post(url, { id: userId }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
                this.editUserData = response.data.message;
                this.isModalOpen = true;
            } catch (error) {
                console.error(error);
                this.$refs.toastComponent.showToast(this.$t('admin.users.fetchUserFail'), 2000, 'danger');
            }
        },

        closeModal() {
            this.isModalOpen = false;
        },

        async saveUser() {
            try {
                const url = this.$api_add + `/admin/updateuser`;

                const response = await axios.post(url, this.editUserData, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
                if (response.data.result === "ok") {
                    this.$refs.toastComponent.showToast(this.$t('account.updateSuccess'), 2000, 'success');

                    const index = this.users.findIndex(user => user.id === this.editUserData.id);
                    if (index !== -1) {
                        this.users[index] = { ...this.editUserData };
                    }
                }
            } catch (error) {
                console.error(error);
                this.$refs.toastComponent.showToast(this.$t('account.updateFailMessage'), 2000, 'danger');
            }
            this.closeModal();
        },

        openGiftModal(user) {
            this.selectedGiftUser = user;
            this.isGiftModalOpen = true;
        },
        handleGifted() {
            this.isGiftModalOpen = false;
        },
        closeGiftModal() {
            this.isGiftModalOpen = false;
        },
        async confirmCancleSubscription(id) {
            this.userIdToCancel = id;
            this.showSubscriptionAlert = true;
        },
        async cancelSubscription(id) {
            try {
                const url = this.$api_add + `/admin/cancelusersubscription`;

                const response = await axios.post(url, { userID: id }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
                if (response.data.result === "ok") {
                    this.$refs.toastComponent.showToast(this.$t('premium.cancelSubscriptionSuccess'), 2000, 'success');
                    const user = this.users.find(user => user.id === id);
                    if (user) {
                        user.isPremiumUser = false;
                    }
                }
            } catch (error) {
                this.$refs.toastComponent.showToast(this.$t('premium.cancelSubscriptionFail'), 2000, 'danger');
            }
        },

        confirmDelete(id) {
            this.userIdToDelete = id;
            this.showDeleteAlert = true;
        },

        async deleteUser(id) {
            try {
                const url = this.$api_add + `/deleteuser`

                const response = await axios.delete(url, { data: { id: id }, headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
                if (response.data.result === "ok") {
                    this.$refs.toastComponent.showToast(this.$t('account.deleteAccountSuccess'), 2000, 'success');
                    this.users = this.users.filter(user => user.id !== id);
                }
            } catch (error) {
                console.error(error);
                this.$refs.toastComponent.showToast(this.$t('account.deleteAccountFail'), 2000, 'danger');
            }
        }
    },

    watch: {
        limit(newLimit) {
            this.page = 1;
            this.$router.replace({ path: '/admin/manage-users', query: { page: this.page, limit: newLimit } });
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
    border: 1px solid #ddd;
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

.selected {
    --background: green;
}

</style>
