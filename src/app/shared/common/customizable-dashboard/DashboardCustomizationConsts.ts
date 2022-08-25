export class DashboardCustomizationConst {
    static widgets = {
        tenant: {
            profitShare: 'Widgets_Tenant_ProfitShare',
            memberActivity: 'Widgets_Tenant_MemberActivity',
            regionalStats: 'Widgets_Tenant_RegionalStats',
            salesSummary: 'Widgets_Tenant_SalesSummary',
            topStats: 'Widgets_Tenant_TopStats',
            generalStats: 'Widgets_Tenant_GeneralStats',
            dailySales: 'Widgets_Tenant_DailySales',
            bugBySeverity : 'Widgets_Tenant_BugBySeverity',
            bugByStatus : 'Widgets_Tenant_BugByStatus',
            storiesByStage : 'Widgets_Tenant_StoriesByStage',
            listOfBugs : 'Widgets_Tenant_ListOfBugs',
            overdueTasks : 'Widgets_Tenant_OverdueTasks',
            overdueStories : 'Widgets_Tenant_OverdueStories',
            overAllProgress : "Widgets_Tenant_OverAllProgress",
            sprintDates : "Widgets_Tenant_SprintDates",
            storyStages : "Widgets_Tenant_StoryStages",
            totalOverdueTaskCount : "Widgets_Tenant_TotalOverdueTaskCount",
            remainingDays : "Widgets_Tenant_RemainingDays",
            storyTaskBugCompleted : "Widgets_Tenant_StoryTaskBugCompleted",
            
            //sales dashboard
            last50NewContacts : "Widgets_Tenant_Last50NewContacts",
            last20Invoices : "Widgets_Tenant_Last20Invoices",
            last20Estimates : "Widgets_Tenant_Last20Estimates",
            appointments : "Widgets_Tenant_Appointments",
            newEstimates : "Widgets_Tenant_NewEstimates",
            newInvoices : "Widgets_Tenant_NewInvoices",
            income : "Widgets_Tenant_Income",
            smsCount : "Widgets_Tenant_SMSCount",
            emailCount : "Widgets_Tenant_EmailCount",
            newClients : "Widgets_Tenant_NewClients"
        },
        host: {
            topStats: 'Widgets_Host_TopStats',
            incomeStatistics: 'Widgets_Host_IncomeStatistics',
            editionStatistics: 'Widgets_Host_EditionStatistics',
            subscriptionExpiringTenants: 'Widgets_Host_SubscriptionExpiringTenants',
            recentTenants: 'Widgets_Host_RecentTenants',

            newTenants: 'Widgets_Host_NewTenants',
            trials : "Widgets_Host_Trials",
            last3MonthNewCancelActive : "Widgets_Host_Last3MonthNewCancelActive",
            totalMembers: 'Widgets_Host_TotalMembers',
            last50Members: 'Widgets_Host_Last50Members', //not in use
            last50Subscriptions : "Widgets_Host_Last50Subscriptions",
            last50CancelledSubscriptions : "Widgets_Host_Last50Cancellations",
        }
    };
    static filters = {
        filterDateRangePicker: 'Filters_DateRangePicker',
        filterProject: 'Filters_Project'
    };
    static dashboardNames = {
        defaultTenantDashboard: 'TenantDashboard',
        defaultHostDashboard: 'HostDashboard',
        projectDashboard : 'ProjectDashboard',
        subscriptionDashboard : 'SubscriptionDashboard',
        salesDashboard : 'SalesDashboard'
    };
    static Applications = {
        Angular: 'Angular'
    };
}
