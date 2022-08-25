import { MenuItem } from './menu.model';

const roles = {
  user: true
}

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true,
    role: 'user,admin,client'
  },
  {
    id: 2,
    label: 'MENUITEMS.DASHBOARDS.TEXT',
    icon: '../../../assets/CRMSteps/MenuIcons/Dashboard.png',
    link: '/dashboard',
    role: 'user,admin,client',
    userType:'host,tenant'
  },
  {
    role: 'admin',
    id: 999,
    label: 'WidgetDashboard',
    icon: '../../../assets/CRMSteps/MenuIcons/Dashboard.png',
    link: '/mydashboard',
    userType:'tenant'
  },
  {
    role: 'admin',
    id: 1000,
    label: 'ProjectDashboard',
    icon: '../../../assets/CRMSteps/MenuIcons/Dashboard.png',
    link: '/projectdashboard',
    userType:'tenant'
  },
  {
    id: 1001,
    label: 'SubscriptionDashboard',
    icon: '../../../assets/CRMSteps/MenuIcons/Dashboard.png',
    link: '/subscriptiondashboard',
    role: 'admin',
    userType:'host'
  },
  {
    id: 1002,
    label: 'SalesDashboard',
    icon: '../../../assets/CRMSteps/MenuIcons/Dashboard.png',
    link: '/salesdashboard',
    role: 'admin',
    userType:'tenant'
  },
  {
    id: 1003,
    label: 'TransactionDashboard',
    icon: '../../../assets/CRMSteps/MenuIcons/Dashboard.png',
    link: '/transactiondashboard',
    role: 'admin',
    userType:'tenant'
  },
  {
    id: 3,
    label: 'MENUITEMS.APPS.TEXT',
    isTitle: true,
    role: 'user,admin,client'
  },

  {
    id: 53,
    label: 'Social Media',
    icon: '../../../assets/CRMSteps/MenuIcons/business-action.png',
    role: 'admin',
    userType:'tenant',
    subItems: [
      {
        id: 1,
        label: 'Credentials Settings',
        link: '/smcredentials',
        icon: '../../../assets/CRMSteps/MenuIcons/business-action.png',
        parentId: 53,
        role: 'admin'
      },
      {
        role: 'admin', id: 2,
        label: 'Stats',
        link: '/stats',
        icon: '../../../assets/CRMSteps/MenuIcons/business-action.png',
        parentId: 53,
      }
    ]
  },
  {
    id: 4,
    label: 'MENUITEMS.ProjectManagement.TEXT',
    icon: '../../../assets/CRMSteps/MenuIcons/Project.svg',
    role: 'user,admin,client',
    userType:'tenant',
    subItems: [
      {
        role: 'user,admin,client', id: 115,
        label: 'MENUITEMS.ProjectManagement.LIST.PROJECTS',
        link: 'pm/project',
        icon: '../../../assets/CRMSteps/MenuIcons/Project.svg',
        parentId: 4,
      },
      {
        role: 'user,admin', id: 116,
        label: 'SprintPlanning',
        link: 'sprintplanning',
        icon: '../../../assets/CRMSteps/MenuIcons/Icon_Sprint.png',
        parentId: 4,
      },
      {
        role: 'admin', id: 110,
        label: 'Storyboard',
        link: 'pm/story/storyboard',
        icon: '../../../assets/CRMSteps/MenuIcons/Icon_Story Management.png',
        parentId: 4
      },
      {
        role: 'admin', id: 111,
        label: 'Taskboard',
        link: '/taskboard',
        icon: '../../../assets/CRMSteps/MenuIcons/task.png',
        parentId: 4
      },
      {
        role: 'admin', id: 34,
        label: 'Bugsboard',
        link: 'bugmanagement/bugsboard',
        icon: '../../../assets/CRMSteps/MenuIcons/Icon_Bug Management.png',
        parentId: 31
      },
      {
        role: 'admin', id: 6,
        label: 'MENUITEMS.ProjectManagement.LIST.PROJECTSTATUS',
        link: 'pm/projectstatus',
        icon: '../../../assets/CRMSteps/MenuIcons/Icon_Project status.png',
        parentId: 2
      },
      {
        role: 'admin', id: 7,
        label: 'MENUITEMS.ProjectManagement.LIST.INDUSTRIES',
        link: 'pm/industry',
        icon: '../../../assets/CRMSteps/MenuIcons/Icon_Industries.png',
        parentId: 2
      },
      {
        role: 'admin', id: 8,
        label: 'MENUITEMS.ProjectManagement.LIST.HHRR',
        icon: '../../../assets/CRMSteps/MenuIcons/Icon_HHRR.png',
        parentId: 2,
        subItems: [
          {
            role: 'admin', id: 9,
            label: 'MENUITEMS.ProjectManagement.LIST.SKILLS',
            link: '/skills',
            icon: '../../../assets/CRMSteps/MenuIcons/Icon_Skills.png',
            parentId: 8
          },
          {
            role: 'admin', id: 11,
            label: 'MENUITEMS.ProjectManagement.LIST.COLLABORATORS',
            link: '/pm/hr/collaborators',
            icon: '../../../assets/CRMSteps/MenuIcons/Icon_Collaborators.png',
            parentId: 8
          },
        ]
      },
      {
        role: 'admin', id: 13,
        label: 'Epics',
        icon: '../../../assets/CRMSteps/MenuIcons/Icon_Epics.png',
        parentId: 2,
        subItems: [
          // {
          //   role: 'admin', id: 14,
          //   label: 'Epic',
          //   link: '/pm/epic/0',
          //   parentId: 13
          // },
          {
            role: 'admin', id: 15,
            label: 'EpicStatus',
            link: '/pm/epic/status',
            icon: '../../../assets/CRMSteps/MenuIcons/Icon_Epics.png',
            parentId: 13
          },
        ]
      },
      {
        role: 'admin', id: 1,
        label: 'Sprint',
        icon: '../../../assets/CRMSteps/MenuIcons/Icon_Sprint.png',
        parentId: 2,
        subItems: [
          // {
          //   role: 'admin', id: 2,
          //   label: 'Sprint',
          //   link: '/pm/sprint/0',
          //   parentId: 1
          // },
          {
            role: 'admin', id: 3,
            label: 'Sprint Status',
            link: '/pm/sprint/status',
            icon: '../../../assets/CRMSteps/MenuIcons/ICONS 05_sprint status.png',
            parentId: 1
          },
          {
            role: 'admin', id: 4,
            label: 'Sprint Types',
            link: '/pm/sprint/types',
            icon: '../../../assets/CRMSteps/MenuIcons/ICONS 05_sprint type.png',
            parentId: 1
          },
        ]
      },
      {
        role: 'admin', id: 14,
        label: 'Story Management',
        parentId: 2,
        icon: '../../../assets/CRMSteps/MenuIcons/Icon_Story Management.png',
        subItems: [
          // {
          //   role: 'admin', id: 15,
          //   label: 'Stories',
          //   link: 'pm/story/stories/0',
          //   icon: '../../../assets/CRMSteps/MenuIcons/Project.svg',
          //   parentId: 14
          // },
          {
            role: 'admin', id: 16,
            label: 'Status',
            link: 'pm/story/storystatuses',
            icon: '../../../assets/CRMSteps/MenuIcons/ICONS 05_ Stories Status.png',
            parentId: 14
          },
          {
            role: 'admin', id: 17,
            label: 'Priorities',
            link: 'pm/story/storypriorities',
            icon: '../../../assets/CRMSteps/MenuIcons/ICONS 05_Story Priorities.png',
            parentId: 14
          },
          {
            role: 'admin', id: 18,
            label: 'Estimations',
            link: 'pm/story/storyestimations',
            icon: '../../../assets/CRMSteps/MenuIcons/ICONS 05_Story Estimations.png',
            parentId: 14
          },
        ]
      },
      {
        role: 'admin', id: 31,
        label: 'Bug Management',
        parentId: 2,
        icon: '../../../assets/CRMSteps/MenuIcons/Icon_Bug Management.png',
        subItems: [
          {
            role: 'admin', id: 32,
            label: 'Status',
            link: 'bugmanagement/bugstatuses',
            icon: '../../../assets/CRMSteps/MenuIcons/ICONS 05_Bug status.png',
            parentId: 31
          },
          {
            role: 'admin', id: 33,
            label: 'Issue Type',
            link: 'bugmanagement/issuetypes',
            icon: '../../../assets/CRMSteps/MenuIcons/ICONS 05_Bug Issue Types.png',
            parentId: 31
          },
          // {
          //   role: 'admin', id: 34,
          //   label: 'Bugs',
          //   link: 'bugmanagement/taskbugs/0',
          //   icon: '../../../assets/CRMSteps/MenuIcons/Project.svg',
          //   parentId: 31
          // },
          {
            role: 'admin', id: 32,
            label: 'Severities',
            link: 'bugmanagement/bugseverities',
            icon: '../../../assets/CRMSteps/MenuIcons/ICONS 05_Bug Severities.png',
            parentId: 31
          },
        ]
      },

      {
        role: 'admin', id: 23,
        label: 'Test Management',
        ParentId: 2,
        icon: '../../../assets/CRMSteps/MenuIcons/Icon_Test Management.png',
        subItems: [
          {
            role: 'admin', id: 24,
            label: 'Type',
            link: 'testmanagement/types',
            icon: '../../../assets/CRMSteps/MenuIcons/Icon_Test Management.png',
            parentId: 23
          },
          {
            role: 'admin', id: 25,
            label: 'Templates',
            link: 'testmanagement/templates',
            icon: '../../../assets/CRMSteps/MenuIcons/ICONS 05_Test management template.png',
            parentId: 23
          },
          {
            role: 'admin', id: 26,
            label: 'Todo',
            link: 'testmanagement/todolist',
            icon: '../../../assets/CRMSteps/MenuIcons/ICONS 05_Test management todolist.png',
            parentId: 23
          },
          {
            role: 'admin', id: 27,
            label: 'Estimation Vote',
            link: 'testmanagement/storyestimationvotes',
            icon: '../../../assets/CRMSteps/MenuIcons/ICONS 05_Test management Story Estimation Vote.png',
            parentId: 23
          }
        ]
      },
    ]
  },
  {
    role: 'admin',
    userType:'tenant',
    id: 117,
    label: 'ContactReview',
    link: '/customer/contactreview',
    icon: '../../../assets/CRMSteps/MenuIcons/Customer Review.svg',
  },
  {
    role: 'admin',
    userType:'tenant',
    id: 118,
    label: 'Contact Objection',
    link: 'contactobjection',
    icon: '../../../assets/CRMSteps/MenuIcons/Client Objection.png',
  },
  {
    role: 'admin',
    userType:'tenant',
    id: 119,
    label: 'Retainer',
    link: 'retainer/contractTemplateNames',
    icon: '../../../assets/CRMSteps/MenuIcons/retainers.png',
  },

  {
    role: 'admin',
    userType:'tenant',
    id: 16,
    label: 'MENUITEMS.ProjectManagement.LIST.TASKMANAGEMENT',
    icon: '../../../assets/CRMSteps/MenuIcons/task.png',
    subItems: [

      // {
      //   role: 'admin', id: 17,
      //   label: 'MENUITEMS.ProjectManagement.LIST.TASKS',
      //   link: '/pmtasks/0',
      //   icon: '../../../assets/CRMSteps/MenuIcons/task.png',
      //   parentId: 16
      // },
      {
        role: 'admin', id: 18,
        label: 'MENUITEMS.ProjectManagement.LIST.TASKVELOCITIIES',
        link: '/taskvelocities',
        icon: '../../../assets/CRMSteps/MenuIcons/task_velocities.png',
        parentId: 16
      },
      {
        role: 'admin', id: 19,
        label: 'MENUITEMS.ProjectManagement.LIST.TASKPRIORITIES',
        link: '/taskpriorites',
        icon: '../../../assets/CRMSteps/MenuIcons/task_priorities.png',
        parentId: 16
      },
      {
        role: 'admin', id: 20,
        label: 'MENUITEMS.ProjectManagement.LIST.TASKSTAGES',
        link: '/taskstages',
        icon: '../../../assets/CRMSteps/MenuIcons/task_stages.png',
        parentId: 16
      },
      {
        role: 'admin', id: 21,
        label: 'MENUITEMS.ProjectManagement.LIST.TASKSTYPES',
        link: '/tasktypes',
        icon: '../../../assets/CRMSteps/MenuIcons/task_types.png',
        parentId: 16
      },
      {
        role: 'admin', id: 22,
        label: 'MENUITEMS.ProjectManagement.LIST.TASKSFREQUENCIES',
        link: '/taskfrequencies',
        icon: '../../../assets/CRMSteps/MenuIcons/task_frequency.png',
        parentId: 16
      },
    ]
  },
  {
    role: 'admin',
    userType:'tenant',
    id: 20,
    label: 'Staff Assignment',
    icon: '../../../assets/CRMSteps/MenuIcons/staff-assignment.png',
    link: '/staffassignment'
  },
  {
    role: 'admin',
    userType:'tenant',
    id: 22,
    label: 'Contacts',
    icon: '../../../assets/CRMSteps/MenuIcons/Contacts.png',
    link: '/customer/contacts'
  },
  {
    role: 'admin',
    userType:'tenant',
    id: 23,
    label: 'SMS Tracking',
    icon: '../../../assets/CRMSteps/MenuIcons/SMS Tracking.png',
    link: '/smstracking'
  },
  {
    role: 'admin',
    userType:'host',
    id: 72,
    label: 'Call Outcomes',
    icon: '../../../assets/CRMSteps/MenuIcons/Contact PhoneCall Outcomes.png',
    link: '/calloutcomes'
  },
  {
    role: 'admin',
    userType:'host',
    id: 73,
    label: 'Call Objectives',
    icon: '../../../assets/CRMSteps/MenuIcons/Phone Call Objetives.png',
    link: '/callobjectives'
  },
  {
    role: 'admin',
    userType:'tenant',
    id: 74,
    label: 'Calls History',
    icon: '../../../assets/CRMSteps/MenuIcons/phone-calls.png',
    link: '/phonecalls'
  },
  {
    role: 'admin',
    userType:'tenant',
    id: 75,
    label: 'Email Tracking',
    icon: '../../../assets/CRMSteps/MenuIcons/Email Tracking.png',
    link: '/contactEmailHistories'
  },
  {
    role: 'admin',
    userType:'host',
    id: 76,
    label: 'Meeting Outputs',
    icon: '../../../assets/CRMSteps/MenuIcons/Contact ZoomMeeting Outputs.png',
    link: '/meeting/contactZoomMeetingOutputs'
  },
  {
    role: 'admin',
    userType:'tenant',
    id: 77,
    label: 'Appointment Reasons',
    icon: '../../../assets/CRMSteps/MenuIcons/Zoom Meeting Comments.png',
    link: '/meeting/contactZoomMeetingAppointmentReasons'
  },
  // {
  //   role: 'admin', id: 78,
  //   label: 'MeetingComments',
  //   icon: '../../../assets/CRMSteps/MenuIcons/contract-Statuses.png',
  //   link: '/meeting/contactZoomCallCommentses'
  // },
  {
    role: 'admin',
    userType:'tenant',
    id: 78,
    label: 'Meetings',
    icon: '../../../assets/CRMSteps/MenuIcons/meetings.png',
    link: '/meeting/contactZoomCallMeetings'
  },
  {
    role: 'admin',
    userType:'tenant',
    id: 21,
    label: 'MENUITEMS.ContractStatus.LIST.CONTRACTSTATUS',
    icon: '../../../assets/CRMSteps/MenuIcons/Contract Status.svg',
    link: '/contractstatus/contractStatuses'
  },

  {
    role: 'admin',
    userType:'tenant',
    id: 28,
    label: 'Marketing',
    icon: '../../../assets/CRMSteps/MenuIcons/campaigns.png',
    subItems: [
      {
        role: 'admin', id: 29,
        label: 'Campaign Objectives',
        link: 'marketing/campaignobjectives',
        icon: '../../../assets/CRMSteps/MenuIcons/campaign-objetives.png',
        parentId: 28
      },
      {
        role: 'admin', id: 30,
        label: 'Campaigns',
        link: 'marketing/campaigns',
        icon: '../../../assets/CRMSteps/MenuIcons/campaigns.png',
        parentId: 28
      }
    ]
  },
  {
    role: 'admin', id: 31,
    label: 'KPI Management',
    icon: '../../../assets/CRMSteps/MenuIcons/kpi-categories.png',
    subItems: [
      {
        role: 'admin', id: 32,
        label: 'KPI Categories',
        link: 'kpimanagement/kpicategories',
        icon: '../../../assets/CRMSteps/MenuIcons/kpi-categories.png',
        parentId: 31
      },
      {
        role: 'admin', id: 33,
        label: 'KPIs',
        link: 'kpimanagement/businessKPIs',
        icon: '../../../assets/CRMSteps/MenuIcons/kpi-categories.png',
        parentId: 31
      },
    ]
  },

  {
    role: 'admin',
    userType:'tenant',
    id: 35,
    label: 'Services',
    icon: '../../../assets/CRMSteps/MenuIcons/Law firm Services.png',
    subItems: [
      {
        role: 'admin', id: 36,
        label: 'Fee Type',
        link: '/lawfirm/feetype',
        icon: '../../../assets/CRMSteps/MenuIcons/fee_type.png',
        parentId: 35
      },
      {
        role: 'admin', id: 37,
        label: 'Services',
        link: 'lawfirm/services',
        icon: '../../../assets/CRMSteps/MenuIcons/Law firm Services.png',
        parentId: 35
      },
    ]
  },
  {
    role: 'admin',
    userType:'tenant',
    id: 38,
    label: 'Expenses',
    icon: '../../../assets/CRMSteps/MenuIcons/expense-trackings.png',
    subItems: [
      {
        role: 'admin', id: 39,
        label: 'Type',
        link: '/expensemanagement/expensetypes',
        icon: '../../../assets/CRMSteps/MenuIcons/expense-types.png',
        parentId: 38
      },
      {
        role: 'admin', id: 40,
        label: 'Expense Manager',
        link: '/expensemanagement/expensetracking',
        icon: '../../../assets/CRMSteps/MenuIcons/expense-trackings.png',
        parentId: 38
      },
      {
        role: 'admin', id: 41,
        label: 'Vendors',
        link: '/expensemanagement/vendors',
        icon: '../../../assets/CRMSteps/MenuIcons/vendors.png',
        parentId: 38
      }
    ]
  },
  {
    role: 'admin', id: 88,
    label: 'Billing',
    userType:'tenant',
    link: '/customer/billingInfos',
    icon: '../../../assets/CRMSteps/MenuIcons/billing.png',
  },
  {
    role: 'admin',
    userType:'tenant',
    id: 88,
    label: 'Knowledge Base',
    link: '/pm/knowledgeBases',
    icon: '../../../assets/CRMSteps/MenuIcons/Icon_Knowledge Bases.png',
  },
  {
    role: 'admin', id: 42,
    label: 'Help Desk',
    icon: '../../../assets/CRMSteps/MenuIcons/Help Desk Statuses.png',
    subItems: [
      {
        role: 'admin', id: 43,
        label: 'Supports',
        link: '/helpdesk/supports',
        icon: '../../../assets/CRMSteps/MenuIcons/supports.png',
        parentId: 42
      },
      // {
      //   role: 'admin', id: 44,
      //   label: 'SupportComments',
      //   link: '/helpdesk/supportticketcomments',
      //   icon: '../../../assets/CRMSteps/MenuIcons/Project.svg',
      //   parentId: 42
      // },
      {
        role: 'admin', id: 45,
        label: 'Status',
        link: '/helpdesk/supportstatuses',
        icon: '../../../assets/CRMSteps/MenuIcons/support-status.png',
        parentId: 42
      }
    ]
  },
  {
    role: 'admin', id: 46,
    label: 'Affiliate Management',
    icon: '../../../assets/CRMSteps/MenuIcons/affiliates.png',
    userType:'host,tenant',
    subItems: [
      {

        role: 'admin',
        userType:'host',
        id: 47,
        label: 'Tiers',
        link: '/affiliatemanagement/affiliateTiers',
        icon: '../../../assets/CRMSteps/MenuIcons/affiliate-tiers.png',
        parentId: 46
      },
      {
        role: 'admin', id: 48,
        label: 'Affiliates',
        link: '/affiliatemanagement/affiliates',
        icon: '../../../assets/CRMSteps/MenuIcons/affiliates.png',
        parentId: 46
      },
      {
        role: 'admin', id: 49,
        label: "Commissions",
        icon: '../../../assets/CRMSteps/MenuIcons/commission-trackings.png',
        subItems: [
          {
            role: 'admin',
            userType:'host',
            id: 50,
            label: 'Status',
            link: '/commissionmanagement/commissionStatuses',
            icon: '../../../assets/CRMSteps/MenuIcons/commission-statuses.png',
            parentId: 49
          },
          {
            role: 'admin', id: 51,
            label: 'Commission Rules',
            link: '/commissionmanagement/commissionRules',
            icon: '../../../assets/CRMSteps/MenuIcons/commission-rules.png',
            parentId: 49
          },
          {
            role: 'admin', id: 52,
            label: 'Commission Trackings',
            link: '/commissionmanagement/commissionTrackings',
            icon: '../../../assets/CRMSteps/MenuIcons/commission-trackings.png',
            parentId: 49
          },
        ]
      }
    ]
  },
  {
    role: 'admin',
    userType:'tenant',
    id: 53,
    label: 'Business Actions',
    icon: '../../../assets/CRMSteps/MenuIcons/business-action.png',
    subItems: [
      {
        role: 'admin', id: 1,
        label: 'Type',
        link: '/businessaction/businesstype',
        icon: '../../../assets/CRMSteps/MenuIcons/business-action.png',
        parentId: 53
      },
      {
        role: 'admin', id: 2,
        label: 'Actions',
        link: '/businessaction/businessaction',
        icon: '../../../assets/CRMSteps/MenuIcons/business-action.png',
        parentId: 53
      },
      {
        role: 'admin', id: 3,
        label: 'Triggers Workflow',
        link: '/businessaction/businessactionworkflow',
        icon: '../../../assets/CRMSteps/MenuIcons/Lead Workflow Movements.png',
        parentId: 53
      },
      {
        role: 'admin', id: 4,
        label: 'Action Triggers',
        link: '/businessaction/businessactiontrigger',
        icon: '../../../assets/CRMSteps/MenuIcons/Lead Workflow Movements.png',
        parentId: 53
      },
      {
        role: 'admin', id: 4,
        label: 'Send Emails',
        link: '/businessaction/testemails',
        icon: '../../../assets/CRMSteps/MenuIcons/Lead Workflow Movements.png',
        parentId: 53
      },
    ]
  },
  {
    role: 'admin',
    userType:'tenant',
    id: 57,
    label: 'DevOps',
    icon: '../../../assets/CRMSteps/MenuIcons/Icon_DevOps.png',
    subItems: [
      {
        role: 'admin', id: 58,
        label: 'Online Tools',
        link: '/devops/onlinetools',
        icon: '../../../assets/CRMSteps/MenuIcons/Icon_Online Tools.png',
        parentId: 57,
      },
      {
        role: 'admin', id: 59,
        label: 'Deployment Management',
        icon: '../../../assets/CRMSteps/MenuIcons/Icon_Deployment Management.png',
        subItems: [
          {
            role: 'admin', id: 60,
            label: 'Deployment Management',
            link: '/devops/deploymentmanagement',
            icon: '../../../assets/CRMSteps/MenuIcons/Icon_Deployment Management.png',
            parentId: 59
          },
          {
            role: 'admin', id: 61,
            label: 'Deployment Details',
            link: '/devops/deploymentdetails',
            icon: '../../../assets/CRMSteps/MenuIcons/ICONS 05_deployment details.png',
            parentId: 59
          },
          {
            role: 'admin', id: 62,
            label: 'Deployment Approval Process',
            link: '/devops/deploymentapprovalprocess',
            icon: '../../../assets/CRMSteps/MenuIcons/ICONS 05_Deployment Approval Process.png',
            parentId: 59
          }
        ],
      },
      {
        role: 'admin', id: 69,
        label: 'Server Inventory',
        icon: '../../../assets/CRMSteps/MenuIcons/Icon_Server Inventories.png',
        subItems: [
          {
            role: 'admin', id: 70,
            label: 'Cloud Providers',
            link: '/devops/cloudproviders',
            icon: '../../../assets/CRMSteps/MenuIcons/ICONS 05_Cloud Providers .png',
            parentId: 69
          },
          {
            role: 'admin', id: 71,
            label: 'Servers',
            link: '/devops/servers',
            icon: '../../../assets/CRMSteps/MenuIcons/ICONS 05_Servers.png',
            parentId: 69
          }
        ],
      },
      {
        role: 'admin', id: 72,
        label: 'Application Inventory',
        icon: '../../../assets/CRMSteps/MenuIcons/Icon_Application Inventories.png',
        subItems: [
          {
            role: 'admin', id: 73,
            label: 'Status',
            link: '/devops/status',
            icon: '../../../assets/CRMSteps/MenuIcons/ICONS 05_Application status.png',
            parentId: 72
          },
          {
            role: 'admin', id: 74,
            label: 'Application',
            link: '/devops/application',
            icon: '../../../assets/CRMSteps/MenuIcons/ICONS 05_Application .png',
            parentId: 72
          }
        ],
      },
      {
        role: 'admin', id: 66,
        label: 'Services Schedule',
        icon: '../../../assets/CRMSteps/MenuIcons/Icon_Services Schedules.png',
        subItems: [
          {
            role: 'admin', id: 67,
            label: 'Job Type',
            link: '/devops/jobTypes',
            icon: '../../../assets/CRMSteps/MenuIcons/ICONS 05_Jobs Type.png',
            parentId: 66
          },
          {
            role: 'admin', id: 68,
            label: 'Recurrent Jobs',
            link: '/devops/applicationRecurrentJobs',
            icon: '../../../assets/CRMSteps/MenuIcons/ICONS 05_Application Recurrent Jobs.png',
            parentId: 66
          }
        ],
      },
      {
        role: 'admin', id: 63,
        label: 'Database',
        icon: '../../../assets/CRMSteps/MenuIcons/Icon_Database.png',
        subItems: [
          {
            role: 'admin', id: 64,
            label: 'Engines',
            link: '/devops/databaseEngines',
            icon: '../../../assets/CRMSteps/MenuIcons/ICONS 05_Database Engines.png',
            parentId: 63
          },
          {
            role: 'admin', id: 65,
            label: 'Databases',
            link: '/devops/clientDatabases',
            icon: '../../../assets/CRMSteps/MenuIcons/Icon_Database.png',
            parentId: 63
          }
        ],
      },
    ]
  },
  // {
  //   role: 'admin', id: 66,
  //   label: 'Doctors',
  //   icon: '../../../assets/CRMSteps/MenuIcons/.svg',
  //   subItems: [
  //     {
  //       role: 'admin', id: 67,
  //       label: 'PhysicalExam',
  //       link: '/doctors/physicalexam',
  //       icon: '../../../assets/CRMSteps/MenuIcons/.svg',
  //       parentId: 66
  //     },
  //     {
  //       role: 'admin', id: 68,
  //       label: 'Background',
  //       link: '/doctors/background',
  //       icon: '../../../assets/CRMSteps/MenuIcons/.svg',
  //       parentId: 66
  //     },
  //     {
  //       role: 'admin', id: 69,
  //       label: 'Sex',
  //       link: '/doctors/sex',
  //       icon: '../../../assets/CRMSteps/MenuIcons/.svg',
  //       parentId: 66
  //     },
  //     {
  //       role: 'admin', id: 70,
  //       label: 'Race',
  //       link: '/doctors/race',
  //       icon: '../../../assets/CRMSteps/MenuIcons/.svg',
  //       parentId: 66
  //     },
  //     {
  //       role: 'admin', id: 71,
  //       label: 'Occupations',
  //       link: '/doctors/occupations',
  //       icon: '../../../assets/CRMSteps/MenuIcons/.svg',
  //       parentId: 66
  //     },
  //     {
  //       role: 'admin', id: 72,
  //       label: 'BloodType',
  //       link: '/doctors/bloodtype',
  //       icon: '../../../assets/CRMSteps/MenuIcons/.svg',
  //       parentId: 66
  //     },
  //     {
  //       role: 'admin', id: 73,
  //       label: 'StaffProfile',
  //       link: '/doctors/staffprofile',
  //       icon: '../../../assets/CRMSteps/MenuIcons/staff-profile.png',
  //       parentId: 66
  //     },
  //     {
  //       role: 'admin', id: 74,
  //       label: 'MedicalHistoryDiseases',
  //       link: '/doctors/medicalhistorydiseases',
  //       icon: '../../../assets/CRMSteps/MenuIcons/.svg',
  //       parentId: 66
  //     },
  //     {
  //       role: 'admin', id: 75,
  //       label: 'MedicalHistoryCondition',
  //       link: '/doctors/medicalhistorycondition',
  //       icon: '../../../assets/CRMSteps/MenuIcons/.svg',
  //       parentId: 66
  //     }
  //   ],
  // },
  {
    role: 'admin', id: 76,
    label: 'Location',
    icon: '../../../assets/CRMSteps/MenuIcons/countries.png',
    subItems: [
      {
        role: 'admin', id: 77,
        label: 'Countries',
        link: '/location/countries',
        icon: '../../../assets/CRMSteps/MenuIcons/countries.png',
        parentId: 76
      },
      {
        role: 'admin', id: 78,
        label: 'States',
        link: '/location/states',
        icon: '../../../assets/CRMSteps/MenuIcons/states.png',
        parentId: 76
      },
    ],
  },
  {
    role: 'admin',
    userType:'tenant',
    id: 82,
    label: 'Push Notifications',
    link: 'admin/pushNotificationHistories',
    icon: '../../../assets/CRMSteps/MenuIcons/push-notification-histories.png',
  },
  {
    role: 'admin', userType:'tenant',
    id: 86,
    label: 'Zoom Credentials',
    link: 'meeting/zoomCredentials',
    icon: '../../../assets/CRMSteps/MenuIcons/zoom-credentials.png',
  },
  {
    role: 'admin',
    userType:'tenant',
    id: 87,
    label: 'Contact Payment History',
    link: 'customer/contactPaymentHistories',
    icon: '../../../assets/CRMSteps/MenuIcons/Contact Payment Histories.png',
  },
  {
    role: 'admin',
    userType:'tenant',
    id: 92,
    label: 'Payment Plan',
    link: 'customer/paymentPlanHeaders',
    icon: '../../../assets/CRMSteps/MenuIcons/Payment Plans.png',
  },

  {
    id: 94,
    userType:'tenant',
    label: 'Estimate',
    link: 'customer/contactQuoteHeaders',
    icon: '../../../assets/CRMSteps/MenuIcons/Quotation.png',
  },
  // {
  //   role: 'admin',
  //   userType:'tenant',
  //   id: 96,
  //   label: 'DocumentAcceptances',
  //   link: 'customer/contactDocumentSignatures',
  //   icon: '../../../assets/CRMSteps/MenuIcons/DocumentAcceptances.png',
  // },
  {
    role: 'admin',
    userType:'tenant',
    id: 96,
    label: 'Contact Billings',
    link: 'customer/contactBillings',
    icon: '../../../assets/CRMSteps/MenuIcons/contact-billing.png',
  },
  //{
 //   role: 'admin',
  //  userType:'tenant',
  //  id: 97,
   // label: 'Contact Documents',
   // link: 'customer/contactDocuments',
   // icon: '../../../assets/CRMSteps/MenuIcons/ContactDocuments.png',
  //},
  // {
  //   role: 'admin',
  //   userType:'host,tenant',
  //   id: 83,
  //   label: 'Communications',
  //   icon: '../../../assets/CRMSteps/MenuIcons/Communication.png',
  //   subItems: [
  //     {
  //       role: 'admin',
  //       userType:'host',
  //       id: 84,
  //       label: 'Events',
  //       link: 'communications/notificationEvents',
  //       icon: '../../../assets/CRMSteps/MenuIcons/Corporate_Event.svg',
  //       parentId: 83
  //     },
  //     {
  //       role: 'admin', id: 85,
  //       label: 'Templates',
  //       link: 'communications/notificationTemplates',
  //       icon: '../../../assets/CRMSteps/MenuIcons/Notification Template.png',
  //       parentId: 83
  //     }
  //   ]
  // },


  {
    role: 'admin', id: 79,
    label: 'Administration',
    icon: '../../../assets/CRMSteps/MenuIcons/Administration.png',
    subItems: [
      {
        role: 'admin', id: 80,
        label: 'Refund Reasons',
        link: 'admin/refundreasons',
        icon: '../../../assets/CRMSteps/MenuIcons/Administration.png',
        parentId: 79
      },
      {
        role: 'admin', id: 80,
        label: 'PBX Settings',
        link: 'admin/pbx',
        icon: '../../../assets/CRMSteps/MenuIcons/Administration.png',
        parentId: 79
      },
      {
        role: 'admin',
        userType:'tenant',
        id: 80,
        label: 'Target Audiences',
        link: 'admin/targetTitles',
        icon: '../../../assets/CRMSteps/MenuIcons/Target Audience.png',
        parentId: 79
      },
      {
        role: 'admin', id: 90,
        label: 'Users',
        link: 'admin/users',
        icon: '../../../assets/CRMSteps/MenuIcons/Users.png',
        parentId: 79
      },
      {
        role: 'admin', id: 91,
        label: 'Roles',
        link: 'admin/roles',
        icon: '../../../assets/CRMSteps/MenuIcons/Roles.png',
        parentId: 79
      },
      {
        role: 'admin', id: 92,
        label: 'Policies',
        link: 'admin/policies',
        icon: '../../../assets/CRMSteps/MenuIcons/policies.png',
        parentId: 79
      },
      {
        role: 'admin', id: 93,
        label: 'Audit Log',
        link: 'admin/auditLog',
        icon: '../../../assets/CRMSteps/MenuIcons/audit-logs.png',
        parentId: 79
      },
      {
        role: 'admin', id: 80,
        label: 'Languages',
        link: 'admin/languages',
        icon: '../../../assets/CRMSteps/MenuIcons/Languages.png',
        parentId: 79
      },
      {
        role: 'admin', id: 80,
        label: 'Subscription',
        link: 'admin/subscription',
        icon: '../../../assets/CRMSteps/MenuIcons/Reteiner Sectionses.png',
        parentId: 79
      },
      {
        role: 'admin', id: 81,
        label: 'Subscription Payments',
        link: 'admin/subscription-payments',
        icon: '../../../assets/CRMSteps/MenuIcons/Reteiner Sectionses.png',
        parentId: 79
      },
      {
        role: 'admin', id: 110,
        label: 'Tenant',
        link: 'admin/tenant',
        icon: '../../../assets/CRMSteps/MenuIcons/Reteiner Sectionses.png',
        parentId: 79
      },
      {
        role: 'admin',
        userType:'tenant',
        id: 111,
        label: 'Settings',
        link: 'admin/tenantSetting',
        icon: '../../../assets/CRMSteps/MenuIcons/Reteiner Sectionses.png',
        parentId: 79
      },
      {
        role: 'admin',
        id: 1002,
        label: 'Subscription Status',
        link: 'admin/subscriptionstatus',
        icon: '../../../assets/CRMSteps/MenuIcons/Reteiner Sectionses.png',
        parentId: 79
      },
      {
        role: 'admin',
        userType:'tenant',
        id: 53,
        label: 'Membership',
        icon: '../../../assets/CRMSteps/MenuIcons/business-action.png',
        subItems: [
          {
            role: 'admin', id: 1,
            label: 'Credit Card',
            link: '/tenant/creditcardinfo',
            icon: '../../../assets/CRMSteps/MenuIcons/business-action.png',
            parentId: 53
          }
        ]
      },
    ]
  },
  {
    role: 'admin', id: 81,
    label: 'Glosary',
    icon: '../../../assets/CRMSteps/MenuIcons/Icon_Glosary.png',
    subItems: [
      {
        role: 'admin', id: 82,
        label: 'Glosary',
        link: 'glosary/glosaryTerms',
        icon: '../../../assets/CRMSteps/MenuIcons/Icon_Glosary.png',
        parentId: 80
      }
    ]
  },
  {
    role: 'admin', id: 82,
    label: 'Activity',
    icon: '../../../assets/CRMSteps/MenuIcons/activity-task.png',
    subItems: [
      {
        role: 'admin', id: 82,
        label: 'Activity Triggers',
        link: 'activity/activityTriggers',
        icon: '../../../assets/CRMSteps/MenuIcons/Services Activity Steps.png',
        parentId: 80
      }
    ]
  },
  {
    role: 'admin', id: 83,
    label: 'Trainings',
    link: 'training',
    icon: '../../../assets/CRMSteps/MenuIcons/trainings.png',
  },
  {
    role: 'admin', id: 87,
    label: 'Meeting Availability',
    link: 'meeting/meetingAvailability',
    icon: '../../../assets/CRMSteps/MenuIcons/meetings.png',
  },
  {
    role: 'admin', id: 88,
    label: 'Invoice',
    icon: '../../../assets/CRMSteps/MenuIcons/invoice.png',
    subItems: [
      {
        role: 'admin', id: 89,
        label: 'Invoice Template',
        link: 'invoice/invoiceTemplate',
        icon: '../../../assets/CRMSteps/MenuIcons/invoice-templates.png',
        parentId: 88
      },
      {
        role: 'admin',
        id: 93,
        label: 'Invoices',
        link: 'customer/contactInvoiceHeaders',
        icon: '../../../assets/CRMSteps/MenuIcons/invoice.png',
        parentId: 88
      },
    ]
  },
  {
    role: 'admin', id: 95,
    label: 'Job Description',
    link: 'jobDescription',
    icon: '../../../assets/CRMSteps/MenuIcons/Icon_Job Description.png',
  },
  //{
  //  role: 'admin',
  //  userType:'tenant',
  //  id: 96,
  //  label: 'Stages History',
  //  link: 'stagesHistory',
  //  icon: '../../../assets/CRMSteps/MenuIcons/Lead Stages History.png',
 // },
  //{
  //  role: 'admin', id: 97,
  //  label: 'Timeline',
  //  link: 'timeline',
   // icon: '../../../assets/CRMSteps/MenuIcons/time-line.png',
  //},
 // {
  //  role: 'admin', id: 98,
  //  label: 'Customer',
  //  link: 'customers',
  //  icon: '../../../assets/CRMSteps/MenuIcons/customers.png',
  //},
  //{
  //  role: 'admin',
  //  userType:'none',
  //  id: 99,
   // label: 'LMS',
    //icon: '../../../assets/CRMSteps/MenuIcons/invoice.png',
   // subItems: [
    //  {
    //    role: 'admin', id: 102,
    //    label: 'Courses',
    //    link: 'lms/lmscourses',
    //    icon: '../../../assets/CRMSteps/MenuIcons/invoice-templates.png',
    //    parentId: 99
    //  },
    //  {
    //    role: 'admin', id: 103,
    //    label: 'CourseChapters',
    //    link: 'lms/coursechapters',
    //    icon: '../../../assets/CRMSteps/MenuIcons/invoice-templates.png',
    //    parentId: 99
    //  },
   //   {
   //     role: 'admin', id: 105,
   //     label: 'ChapterTopics',
   //     link: 'lms/chaptertopics',
   //     icon: '../../../assets/CRMSteps/MenuIcons/invoice-templates.png',
    //    parentId: 99
    //  },
    //  {
    //    role: 'admin', id: 104,
    //    label: 'TopicTypes',
    //    link: 'lms/topictypes',
    //    icon: '../../../assets/CRMSteps/MenuIcons/invoice-templates.png',
    //    parentId: 99
    //  },
  //    {
  //      role: 'admin', id: 104,
  //      label: 'ResourceMaterial',
//        link: 'learningcenter/resourcemateriallist',
 //       icon: '../../../assets/CRMSteps/MenuIcons/invoice-templates.png',
  //      parentId: 100
  //    },
      // {
      //   role: 'admin', id: 100,
      //   label: 'FormType',
      //   link: 'lms/lmsform/lmsformtype',
      //   icon: '../../../assets/CRMSteps/MenuIcons/invoice-templates.png',
      //   parentId: 99
      // },
      // {
      //   role: 'admin', id: 101,
      //   label: 'DisplayType',
      //   link: 'lms/lmsform/lmsdisplaytype',
      //   icon: '../../../assets/CRMSteps/MenuIcons/invoice-templates.png',
      //   parentId: 99
      // },
      // {
      //   role: 'admin', id: 101,
      //   label: 'Form',
      //   link: 'lms/lmsform/form',
      //   icon: '../../../assets/CRMSteps/MenuIcons/invoice-templates.png',
      //   parentId: 99
      // }
    //]
  //},
  {
    role: 'admin',
    userType:'tenant',
    id: 99,
    label: 'LearningCenter',
    icon: '../../../assets/CRMSteps/MenuIcons/invoice.png',
    subItems: [
      {
        role: 'admin', id: 102,
        label: 'CourseCategory',
        link: 'learningcenter/coursecategory',
        icon: '../../../assets/CRMSteps/MenuIcons/invoice-templates.png',
        parentId: 99
      },
      {
        role: 'admin', id: 104,
        label: 'CourseCertificate',
        link: 'learningcenter/coursecertificate',
        icon: '../../../assets/CRMSteps/MenuIcons/invoice-templates.png',
        parentId: 100
      },
      {
        role: 'admin', id: 104,
        label: 'CourseNew',
        link: 'learningcenter/coursenew',
        icon: '../../../assets/CRMSteps/MenuIcons/invoice-templates.png',
        parentId: 100
      },
      {
        role: 'admin', id: 104,
        label: 'CourseChapter',
        link: 'learningcenter/coursechapter',
        icon: '../../../assets/CRMSteps/MenuIcons/invoice-templates.png',
        parentId: 100
      },
    ]
  },
];

