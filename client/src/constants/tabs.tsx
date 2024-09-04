import React from "react";
import ProfileForm from "@/components/web/forms/accounts/profile";
import ChangePasswordForm from "@/components/web/forms/accounts/change-password";
import NotificationForm from "@/components/web/forms/accounts/notification";
import DeleteAccountForm from "@/components/web/forms/accounts/delete-account";
import AccountHistory from "@/components/web/forms/accounts/account-history";
import BillingForm from "@/components/web/forms/accounts/billing-form";
import BillingInformation from "@/components/web/forms/accounts/billing-information";
import DeleteProjectForm from "@/components/web/forms/settings/delete-project";
import FigmaConnectionForm from "@/components/web/forms/settings/figma-connection";
import RepositoryConnection from "@/components/web/forms/settings/repository-connection";
import ManageTeamForm from "@/components/web/forms/settings/manage-team";


export enum TAB_HEADERS {
  ACCOUNTS = "ACCOUNTS",
  UI_KIT_SETTINGS = "UI_KIT_SETTINGS",
}

export const TAB_TYPES = {
  ACCOUNTS: {
    PROFILE: "#accountProfile",
    CHANGE_PASSWORD: "#accountChangePassword",
    NOTIFICATION: "#accountNotification",
    UPGRADE_BILLING: "#accountUpgradeBilling",
    BILLING_INFORMATION: "#accountBillingInformation",
    BILLING_HISTORY: "#accountBillingHistory",
    DELETE: "#accountDelete",
  },
  UI_KIT_SETTINGS: {
    FIGMA_CONNECTION: "#figmaConnection",
    MANAGE_TEAM: "#manageTeam",
    REPOSITORY_CONNECTION: "#repositoryConnection",
    DELETE: "#deleteKit",
  },
};


export interface ITab {
  label: string;
  tab: string;
  component?: React.ReactNode;
}

export const accountsTabItems: ITab[] = [
  {
    label: "Profile",
    tab: TAB_TYPES.ACCOUNTS.PROFILE,
    component: <ProfileForm />
  },
  {
    label: "Password",
    tab: TAB_TYPES.ACCOUNTS.CHANGE_PASSWORD,
    component: <ChangePasswordForm />
  },
  {
    label: "Notifications",
    tab: TAB_TYPES.ACCOUNTS.NOTIFICATION,
    component: <NotificationForm />
  },
  {
    label: "Upgrade & Billing",
    tab: TAB_TYPES.ACCOUNTS.UPGRADE_BILLING,
    component: <BillingForm />
  },
  {
    label: "Billing Information",
    tab: TAB_TYPES.ACCOUNTS.BILLING_INFORMATION,
    component: <BillingInformation />
  },
  {
    label: "Billing history",
    tab: TAB_TYPES.ACCOUNTS.BILLING_HISTORY,
    component: <AccountHistory />
  },
  {
    label: "Delete",
    tab: TAB_TYPES.ACCOUNTS.DELETE,
    component: <DeleteAccountForm />
  },
];


export const uiKitSettingsTab: ITab[] = [
  {
    label: "Figma Connection",
    tab: TAB_TYPES.UI_KIT_SETTINGS.FIGMA_CONNECTION,
    component: <FigmaConnectionForm />
  }, {
    label: "Manage Team",
    tab: TAB_TYPES.UI_KIT_SETTINGS.MANAGE_TEAM,
    component: <ManageTeamForm />
  },
  {
    label: "Repository Connection",
    tab: TAB_TYPES.UI_KIT_SETTINGS.REPOSITORY_CONNECTION,
    component: <RepositoryConnection />
  }, {
    label: "Delete",
    tab: TAB_TYPES.UI_KIT_SETTINGS.DELETE,
    component: <DeleteProjectForm />
  }
]