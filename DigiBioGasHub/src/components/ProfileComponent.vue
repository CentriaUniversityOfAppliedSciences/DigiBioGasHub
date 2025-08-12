<template>
    <ion-grid fixed>
        <ion-row>

            <ion-col size="12" size-md="3">
                <div class="profile-actions">
                    <div class="action-link" @click="toggleEditUser">{{ $t('menu.edit') }}</div>
                    <div class="action-link" @click="settings_button">{{ $t('general.settings') }}</div>
                    <div class="action-link" @click="goToApiKey">{{ $t('apiKeys.title') }}</div>
                    <div v-if="use_payment == 'true'" class="action-link" @click="goToSubscriptionPage">
                        {{ $t('premium.manage_subscriptions') }}
                    </div>
                    <div class="action-link" id="changePassword">{{ $t('menu.changePassword') }}</div>
                    <div class="action-link danger" id="deleteUser">{{ $t('menu.deleteAccount') }}</div>
                </div>
            </ion-col>

            <ion-col size="12" size-md="9">
                <ion-card class="profile-card">
                    <ion-card-content>

                        <div class="profile-header ion-text-center">
                            <ion-avatar class="profile-avatar">
                                <div class="avatar-text">
                                    {{ user.name ? user.name.charAt(0).toUpperCase() : '?' }}
                                </div>
                            </ion-avatar>
                            <h2>{{ user.name }}</h2>
                            <p>{{ user.email }}</p>
                        </div>

                        <ion-list lines="inset">
                            <ion-item>
                                <ion-label position="stacked">{{ $t('account.name') }}</ion-label>
                                <ion-input :disabled="EditUser" v-model="editableUser.name"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="stacked">{{ $t('account.email') }}</ion-label>
                                <ion-input :disabled="EditUser" v-model="editableUser.email"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="stacked">{{ $t('account.phone') }}</ion-label>
                                <ion-input :disabled="EditUser" v-model="editableUser.phone"></ion-input>
                            </ion-item>
                        </ion-list>

                        <div v-if="!EditUser" class="edit-buttons" style="margin-top: 1rem; display: flex; gap: 1rem;">
                            <ion-button color="primary" @click="saveUser" :disabled="!hasChanges">{{ $t('menu.save') }}</ion-button>
                            <ion-button color="medium" @click="cancelEdit">{{ $t('general.cancel') }}</ion-button>
                        </div>

                    </ion-card-content>
                </ion-card>
            </ion-col>

        </ion-row>
    </ion-grid>

    <ion-modal trigger="changePassword">
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ $t('menu.changePassword') }}</ion-title>
                <ion-button slot="end" color="danger" @click="modalController.dismiss()">{{ $t('general.close')
                }}</ion-button>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-input :label="$t('account.oldPassword')" type="password"></ion-input>
            <ion-input :label="$t('account.newPassword')" type="password"></ion-input>
            <ion-input :label="$t('account.newPasswordRepeat')" type="password"></ion-input>
            <ion-button expand="block" @click="changePassword()">{{ $t('menu.save') }}</ion-button>
        </ion-content>
    </ion-modal>

    <ion-alert trigger="deleteUser" :header="$t('account.deleteAccount')" :message="$t('account.deleteAccountConfirm')"
        :buttons="[{ text: $t('general.cancel'), role: 'cancel' }, { text: $t('general.yes'), handler: deleteUser }]">
    </ion-alert>

    <ToastComponent ref="toastComponent" />

</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonInput, IonButton, IonModal, modalController, IonAlert, IonAvatar, IonCol, IonRow, IonGrid } from '@ionic/vue';
import AddOfferComponent from './AddOfferComponent.vue';
import AddCompanyComponent from './AddCompanyComponent.vue';
import axios from 'axios';
import ToastComponent from './ToastComponent.vue';


export default defineComponent({
    name: 'ProfileComponent',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonList,
        IonItem,
        IonLabel,
        IonInput,
        IonButton,
        AddOfferComponent,
        IonModal,
        AddCompanyComponent,
        IonAlert,
        IonCol,
        IonRow,
        IonGrid,
        IonAvatar,
        ToastComponent
    },
    setup() {
        return { modalController };
    },
    props: {
        user: {
            name: String,
            email: String,
            phone: String,
            address: String,
            company: String,
            role: String
        },
        offers: {
            type: Array,
            required: true
        },
        company: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            isInCompany: false,
            currPassword: '',
            newPassword: '',
            repeatPassword: '',
            EditUser: true,
            editableUser: { ...this.user },
            use_payment: this.$use_payment
        };
    },
    watch: {
        user(newUser) {
            this.editableUser = { ...newUser };
        }
    },
    computed: {
        hasChanges() {
            return (
                this.editableUser.name !== this.user.name ||
                this.editableUser.email !== this.user.email ||
                this.editableUser.phone !== this.user.phone
            );
        }
    },
    methods: {
        toggleEditUser() {
            this.EditUser = false;
        },
        cancelEdit() {
            this.editableUser = { ...this.user };
            this.EditUser = true;
        },
        saveUser() {
            axios.post(this.$api_add + '/updateuser', {
                name: this.editableUser.name,
                email: this.editableUser.email,
                phone: this.editableUser.phone,
            }).then(response => {
                if (response.data.result === 'ok') {
                    this.EditUser = true;
                    this.$refs.toastComponent.showToast(this.$t('account.updateSuccess'), 2000, 'success');
                } else {
                    this.$refs.toastComponent.showToast(this.$t('account.updateFail'), 2000, 'danger');
                }
            }).catch(error => {
                this.ToastComponent.methods.showToast(this.$t('account.updateFail'), 2000, 'danger');
            });
        },
        deleteUser() {
            axios.post(this.$api_add + '/deleteuser', { id: this.getUserID() }).then(response => {
                if (response.data.result === 'ok') {
                    this.ToastComponent.methods.showToast(this.$t('account.deleteSuccess'), 2000, 'success');
                    localStorage.removeItem('token');
                    this.$router.push({ name: 'Login' });
                } else {
                    this.ToastComponent.methods.showToast(this.$t('account.deleteFail'), 2000, 'danger');
                }
            }).catch(error => {
                this.ToastComponent.methods.showToast(this.$t('account.deleteFail'), 2000, 'danger');
            })
        },
        getUserID() {
            let token = localStorage.getItem('token');
            let decoded = JSON.parse(atob(token.split('.')[1]));
            return decoded.id;
        },
        changePassword() {
            axios.post(this.$api_add + '/changepassword', {
                id: this.getUserID(),
                currPassword: this.currPassword,
                newPassword: this.newPassword,
                repeatPassword: this.repeatPassword
            }).then(response => {
                if (response.data.result === 'ok') {
                    this.ToastComponent.methods.showToast(this.$t('account.passwordChangeSuccess'), 2000, 'success');
                    this.modalController.dismiss();
                } else {
                    this.ToastComponent.methods.showToast(this.$t('account.passwordChangeFail'), 2000, 'danger');
                }
            }).catch(error => {
                this.ToastComponent.methods.showToast(this.$t('account.passwordChangeFail'), 2000, 'danger');
            });
        },
        settings_button() {
            this.$router.push({ name: 'Settings' });
        },
        goToApiKey() {
            this.$router.push({ name: 'ApiKeysPage' });
        },
        goToSubscriptionPage() {
            this.$router.push({ name: 'SubscriptionPage' });
        }
    },
    mounted() {
        if (this.company) {
            this.isInCompany = false;
        }
    }

});
</script>

<style scoped>
.profile-actions {
    display: flex;
    flex-direction: column;
}

.action-link {
    padding: 12px 0;
    font-size: 16px;
    font-weight: 500;
    color: var(--ion-color-primary);
    cursor: pointer;
    transition: color 0.2s ease;
}

.action-link:last-child {
    border-bottom: none;
}

.action-link:hover {
    color: var(--ion-color-primary-shade);
}

.action-link.danger {
    color: var(--ion-color-danger);
}

.profile-card {
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.profile-header {
    margin-bottom: 20px;
}

.profile-avatar {
    width: 100px;
    height: 100px;
    margin: auto;
    background-color: var(--ion-color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
}

.avatar-text {
    color: white;
    font-size: 48px;
    font-weight: bold;
}
</style>
