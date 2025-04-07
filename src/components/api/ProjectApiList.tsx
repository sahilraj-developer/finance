import BackendUrl from './BackendUrl';

export default function ProjectApiList() {
  let baseUrl = BackendUrl;
  let apiList = {
    //heartBeatApi
    api_checkHeartBeat: `${baseUrl}/api/heartbeat`,
    // 1 API TO MENU LIST
    api_getFreeMenuList: `${baseUrl}/api/menu/by-module`,
    //WARD LIST
    api_login: `${baseUrl}/api/login`,

    // 19 API TO GET WORKFLOW BASIC INFO LIKE PERMISSIONS/WORKFLOW-CANDIDATES
    api_workflowInfo: `${baseUrl}/api/workflow/role-map/workflow-info`,

    // 21 API TO POST DEPARTMENTAL COMMUNICATION DATA
    api_postDepartmental: `${baseUrl}/api/post-custom-data`,

    // 22 API TO TO GET SAF DEPARTMENTAL COMMUNICATION LIST
    api_getDepartmentalData: `${baseUrl}/api/get-all-custom-tab-data`,

    //application demand detail in demand screen
    api_verifyDocuments: `${baseUrl}/api/workflows/document/verify-reject`,
    //application demand detail in demand screen
    api_changePassword: `${baseUrl}/api/change-password`,

    // API TO EDIT ADMIN PROFILE
    api_editAdminProfile: `${baseUrl}/api/edit-my-profile`,
    // API TO FETCH JSK DASHBOARD RECENT APPLICATIONS AND RECENT PAYMENTS

    // API TO FETCH NOTIFICATION DATA
    api_getNotification: `${baseUrl}/api/get-user-notifications`,
    // API TO CREATE NOTIFICATION DATA
    api_createNotification: `${baseUrl}/api/dashboard/jsk/prop-dashboard`,
    // API TO DELETE NOTIFICATION DATA
    api_deleteNotification: `${baseUrl}/api/dashboard/jsk/prop-dashboard`,

    ////////////////////////////////////////////////////////////
    /////////////////         JFC Apis               //////////
    //////////////////////////////////////////////////////////

    api_getUlbs: `${baseUrl}/api/sudafc/ulbs`,
    api_getUlbSchemes: `${baseUrl}/api/sudafc/ulbs-schemes`,
    api_postSchemeInfo: `${baseUrl}/api/sudafc/scheme-info`,
    api_getAllSchemeInfo: `${baseUrl}/api/sudafc/all-scheme-info`, //new api for all
    api_updateSchemeInfo: `${baseUrl}/api/sudafc/scheme`,
    api_getSchemeById: `${baseUrl}/api/sudafc/scheme-info/view`,
    api_viewSchemeById: `${baseUrl}/api/sudafc/scheme-info/view`,
    api_viewSchemeAll: `${baseUrl}/api/sudafc/scheme-info/show`,
    api_postFinancialGrant: `${baseUrl}/api/sudafc/scheme-info/update`,
    api_getFinancialSummary: `${baseUrl}/api/sudafc/financial-summary`,
    api_getFundsSummary: `${baseUrl}/api/sudafc/fund-released`,
    // Exports
    api_getFinancialSummaryExport: `${baseUrl}/api/sudafc/financial-summary-csv`,
    api_getFinancialProgressExport: `${baseUrl}/api/sudafc/financial-progress-csv`,
    api_getPhysicalProgressExport: `${baseUrl}/api/sudafc/physical-progress-csv`,
    api_postFinancialSummaryUpdate: `${baseUrl}/api/sudafc/fund-release`,
    // api_getFinancialSummaryUpdated: `${baseUrl}/api/sudafc/financial-summary/updated`,
    api_getFinancialSummaryUpdated: `${baseUrl}/api/sudafc/fund-released`,
    api_getMillionData: `${baseUrl}/api/sudafc/financial-DB-MillionPlus`,
    api_getNonMillionData: `${baseUrl}/api/sudafc/financial-DB-NonMillionPlus`,
    api_getUlbFilter: `${baseUrl}/api/sudafc/ulb-info`,
    api_postSendLetter: `${baseUrl}/api/sudafc/send-letter`,
    api_deleteLetter: `${baseUrl}/api/sudafc/letter`,
    api_postLetterUpload: `${baseUrl}/api/sudafc/letter`,
    api_getLetterUploaded: `${baseUrl}/api/sudafc/letters`,
    api_getUlbWiseLetter: `${baseUrl}/api/sudafc/letters/ulb`,
    // api_getNotification: `${baseUrl}/api/sudafc/letters/ulb/notifications`,
    api_editReportSummary: `${baseUrl}/api/sudafc/update-scheme-name`,

    ////////////////////////////////////////////////////////////
    ///////////////       FINANCE Apis             //////////
    //////////////////////////////////////////////////////////

    // ════════════════════════════║ API OF CASHBOOK DETAILS CRUD ║═════════════════════════════════

    //Cashbook Api
    api_getCashbookDetails: `${baseUrl}/api/finance/cashbook/getall`,
    api_postCashbookDetails: `${baseUrl}/api/finance/cashbook/createcashbook`,
    api_forwardCashbookDetails: `${baseUrl}/api/finance/cashbook/forward-cashbook`,
    api_updateCashbookDetails: `${baseUrl}/api/finance/cashbook/updatecashbook`,
    api_deleteCashbookDetails: `${baseUrl}/api/finance/cashbook/delete`,
    api_getRejectedCashbookDetails: `${baseUrl}/api/finance/cashbook/getrejectedall`,
    api_getRejectCashbookDetails: `${baseUrl}/api/finance/cashbook/getrejectall`,
    
    // Journal Api
    api_postJournalDetails: `${baseUrl}/api/finance/joural/createjournal`,
    api_forwardJournalDetails: `${baseUrl}/api/finance/joural/forward-journal`,
    api_getJournalDetails: `${baseUrl}/api/finance/joural/getall`,
    api_updateJournalDetails: `${baseUrl}/api/finance/joural/updatejournal`,
    api_deleteJournalDetails: `${baseUrl}/api/finance/joural/delete`,

    // Ledger Api
    api_postLedgerDetails: `${baseUrl}/api/finance/ledger/createledger`,
    api_getLedgerDetails: `${baseUrl}/api/finance/ledger/getall`,
    api_forwardLedgerDetails: `${baseUrl}/api/finance/ledger/forward-ledger`,
    api_getLedgerMergedDetails: `${baseUrl}/api/finance/ledger/getall/cashbook-journal`,
    api_deleteLedgerDetails: `${baseUrl}/api/finance/ledger/delete`,
    api_updateLedgerDetails: `${baseUrl}/api/finance/ledger/updateledger`,
    // upda
    api_updateLedgerCashbookDetails: `${baseUrl}/api/finance/ledger/update-cb-ledger`,
    api_updateLedgerJournalDetails: `${baseUrl}/api/finance/ledger/update-jrnl-ledger`,

    // Cheque Issue Api
    api_postChequeIssueRegister: `${baseUrl}/api/finance/check-issue-register/createcheque`,
    api_getAllChequeIssueRegister: `${baseUrl}/api/finance/check-issue-register/getall`,
    api_getChequeIssueRegisterById: `${baseUrl}/api/finance/check-issue-register/getById`,
    api_updateChequeIssueRegisterById: `${baseUrl}/api/finance/check-issue-register/updatecheque-issue-register`,
    api_deleteChequeIssueRegisterById: `${baseUrl}/api/finance/check-issue-register/delete`,
    api_forwardChequeIssueRegisterById: `${baseUrl}/api/finance/check-issue-register/update-status`,

    // receipt budget
    api_postReceiptBudget: `${baseUrl}/api/finance/receipt-budget/createreceipt-budget`,
    api_getReceiptBudget: `${baseUrl}/api/finance/receipt-budget/getall`,

    api_postRegisterofAdvancefortheyear: `${baseUrl}/api/finance/register-of-advance-for-year/create`,
    api_getRegisterofAdvancefortheyear: `${baseUrl}/api/finance/register-of-advance-for-year/getall`,
    api_getRegisterofAdvancefortheyearById: `${baseUrl}/api/finance/register-of-advance-for-year/getById`,
    api_updateRegisterofAdvancefortheyearById: `${baseUrl}/api/finance/register-of-advance-for-year/updatecheque`,
    api_deleteRegisterofAdvancefortheyearById: `${baseUrl}/api/finance/register-of-advance-for-year/delete`,
    api_forwardRegisterofAdvancefortheyearById: `${baseUrl}/api/finance/register-of-advance-for-year/update-status`,
    

    //receipt register apis GEN-9 //
    

    //Register of Permanent Advance
    api_postRegisterofPermanentAdvance: `${baseUrl}/api/finance/register-permanent-advance/create`,
    api_getRegisterofPermanentAdvance: `${baseUrl}/api/finance/register-permanent-advance/getall`,
    api_getRegisterofPermanentAdvanceById: `${baseUrl}/api/finance/register-permanent-advance/getById`,
    api_forwardRegisterofPermanentAdvanceById: `${baseUrl}/api/finance/register-permanent-advance/update-status`,
    api_updateRegisterofPermanentAdvanceById: `${baseUrl}/api/finance/register-permanent-advance/update`,
    api_deleteRegisterofPermanentAdvanceById: `${baseUrl}/api/finance/register-permanent-advance/delete`,

    ///////receipt register apis //
    api_getReceiptRegisterDetails: `${baseUrl}/api/finance/receipt-register/getall`,
    api_getReceiptRegisterDetailsById: `${baseUrl}/api/finance/receipt-register/getbyid`,
    api_getReceiptRegisterDetailsByUniqueId: `${baseUrl}/api/finance/receipt-register/unique-id`,
    api_postReceiptRegisterDetails: `${baseUrl}/api/finance/receipt-register/createreceipts`,
    api_updateReceiptRegisterDetails: `${baseUrl}/api/finance/receipt-register/updatereceipts`,
    api_updateReceiptRegisterDetailsByUniqueId: `${baseUrl}/api/finance/receipt-register/update-byUniqueId`,
    api_deleteReceiptRegisterDetails: `${baseUrl}/api/finance/receipt-register/delete`,
    api_deleteReceiptRegisterDetailsByUniqueId: `${baseUrl}/api/finance/receipt-register/delete-byUniqueId`,
    api_forwardReceiptRegisterDetailsById: `${baseUrl}/api/finance/receipt-register/update-status`,
    api_forwardReceiptRegisterDetailsByUniqueId: `${baseUrl}/api/finance/receipt-register/update-status-byUniqueId`,
    

    ///////statement status cheque receipt apis GEN-10//
    api_getStatusChequeReceiptDetails: `${baseUrl}/api/finance/status-chequereceipt/getall`,
    api_getStatusChequeReceiptDetailsById: `${baseUrl}/api/finance/status-chequereceipt/getById`,
    api_postStatusChequeReceiptDetails: `${baseUrl}/api/finance/status-chequereceipt/create`,
    api_updateStatusChequeReceiptDetails: `${baseUrl}/api/finance/status-chequereceipt/update`,
    api_deleteStatusChequeReceiptDetails: `${baseUrl}/api/finance/status-chequereceipt/delete`,
    api_forwardStatusChequeReceiptDetailsById: `${baseUrl}/api/finance/status-chequereceipt/update-status`,

    //////Collection register apis GEN-11 //
    api_getCollectionRegisterDetails: `${baseUrl}/api/finance/collection-register/getall`,
    api_getCollectionRegisterDetailsById: `${baseUrl}/api/finance/collection-register/getById`,
    api_getCollectionRegisterDetailsByUniqueId: `${baseUrl}/api/finance/collection-register/unique-id`,
    api_postCollectionRegisterDetails: `${baseUrl}/api/finance/collection-register/create-collection-register`,
    api_updateCollectionRegisterDetails: `${baseUrl}/api/finance/collection-register/update-collection-register`,
    api_updateCollectionRegisterDetailsByUniqueId: `${baseUrl}/api/finance/collection-register/update-byUniqueId`,
    api_deleteCollectionRegisterDetails: `${baseUrl}/api/finance/collection-register/delete`,
    api_deleteCollectionRegisterDetailsByUniqueId: `${baseUrl}/api/finance/collection-register/delete-byUniqueId`,
    api_forwardCollectionRegisterDetailsById: `${baseUrl}/api/finance/collection-register/update-status`,
    api_forwardCollectionRegisterDetailsByUniqueId: `${baseUrl}/api/finance/collection-register/update-status-byUniqueId`,

    //////Summary of Daily colection register GEN-12 ///////////
    api_postSummarydailyCollectionRegister: `${baseUrl}/api/finance/summary-of-daily-collection/create`,
    api_getSummarydailyCollectionRegister: `${baseUrl}/api/finance/summary-of-daily-collection/getall`,
    api_getSummarydailyCollectionRagisterById: `${baseUrl}/api/finance/receipt-register/unique-id`,
    api_getSummarydailyCollectionByUniqueId: `${baseUrl}/api/finance/summary-of-daily-collection/getByunique-id`,
    api_updateSummarydailyCollectionRegister: `${baseUrl}/api/finance/summary-of-daily-collection/update`,
    api_updateSummarydailyCollectionByUniqueId: `${baseUrl}/api/finance/summary-of-daily-collection/update-byUniqueId`,
    api_deleteSummarydailyCollectionRegister: `${baseUrl}/api/finance/summary-of-daily-collection/delete`,
    api_deleteSummarydailyCollectionByUniqueId: `${baseUrl}/api/finance/summary-of-daily-collection/delete-byUniqueId`,
    api_forwardSummarydailyCollectionRegisterById: `${baseUrl}/api/finance/summary-of-daily-collection/update-status`,
    api_forwardSummarydailyCollectionByUniqueId: `${baseUrl}/api/finance/summary-of-daily-collection/update-status-byUniqueId`,


    // Register of Refunds, Remissions & Write-Off (Form GEN-25)
    api_getRegisterRefundRemissionWriteOffDetails: `${baseUrl}/api/finance/register-refund-remission-writeoff/getall`,
    api_getRegisterRefundRemissionWriteOffDetailsById: `${baseUrl}/api/finance/register-refund-remission-writeoff/getById`,
    api_postRegisterRefundRemissionWriteOffDetails: `${baseUrl}/api/finance/register-refund-remission-writeoff/create`,
    api_updateRegisterRefundRemissionWriteOffDetails: `${baseUrl}/api/finance/register-refund-remission-writeoff/update`,
    api_deleteRegisterRefundRemissionWriteOffDetails: `${baseUrl}/api/finance/register-refund-remission-writeoff/delete`,
    api_forwardRegisterRefundRemissionWriteOffDetailsById: `${baseUrl}/api/finance/register-refund-remission-writeoff/update-status`,
    api_getGenEntriesMaster: `${baseUrl}/api/finance/master-genEntries/get`,

    // Asset Replacement Register (GEN-35)
    api_getAssetReplacementRegisterDetails: `${baseUrl}/api/finance/asset-replacement-register/getall`,
    api_getAssetReplacementRegisterDetailsById: `${baseUrl}/api/finance/asset-replacement-register/getById`,
    api_postAssetReplacementRegisterDetails: `${baseUrl}/api/finance/asset-replacement-register/create`,
    api_updateAssetReplacementRegisterDetails: `${baseUrl}/api/finance/asset-replacement-register/update`,
    api_deleteAssetReplacementRegisterDetails: `${baseUrl}/api/finance/asset-replacement-register/delete`,
    api_forwardAssetReplacementRegisterDetailsById: `${baseUrl}/api/finance/asset-replacement-register/update-status`,

    //////Expenses Subsidiary Ledger apis GEN-34 //
    api_getExpensesSubsidaryLedgerDetails: `${baseUrl}/api/finance/expenses-subsidary-ledger/getall`,
    api_getExpensesSubsidaryLedgerDetailsById: `${baseUrl}/api/finance/expenses-subsidary-ledger/getById`,
    api_getExpensesSubsidaryLedgerDetailsByUniqueId: `${baseUrl}/api/finance/expenses-subsidary-ledger/getByunique-id`,
    api_postExpensesSubsidaryLedgerDetails: `${baseUrl}/api/finance/expenses-subsidary-ledger/create`,
    api_updateExpensesSubsidaryLedgerDetails: `${baseUrl}/api/finance/expenses-subsidary-ledger/update`,
    api_updateExpensesSubsidaryLedgerDetailsByUniqueId: `${baseUrl}/api/finance/expenses-subsidary-ledger/update-byUniqueId`,
    api_deleteExpensesSubsidaryLedgerDetails: `${baseUrl}/api/finance/expenses-subsidary-ledger/delete`,
    api_deleteExpensesSubsidaryLedgerDetailsByUniqueId: `${baseUrl}/api/finance/expenses-subsidary-ledger/delete-byUniqueId`,
    api_forwardExpensesSubsidaryLedgerDetailsById: `${baseUrl}/api/finance/expenses-subsidary-ledger/update-status`,
    api_forwardExpensesSubsidaryLedgerDetailsByUniqueId: `${baseUrl}/api/finance/expenses-subsidary-ledger/update-status-byUniqueId`,


    //////Income Subsidiary Ledger apis GEN-33 //
    api_getIncomeSubsidaryLedgerDetails: `${baseUrl}/api/finance/income-subsidiary-ledger/getall`,
    api_getIncomeSubsidaryLedgerDetailsById: `${baseUrl}/api/finance/income-subsidiary-ledger/getById`,
    api_getIncomeSubsidaryLedgerDetailsByUniqueId: `${baseUrl}/api/finance/income-subsidiary-ledger/getByunique-id`,
    api_postIncomeSubsidaryLedgerDetails: `${baseUrl}/api/finance/income-subsidiary-ledger/create`,
    api_updateIncomeSubsidaryLedgerDetails: `${baseUrl}/api/finance/income-subsidiary-ledger/update`,
    api_updateIncomeSubsidaryLedgerDetailsByUniqueId: `${baseUrl}/api/finance/income-subsidiary-ledger/update-byUniqueId`,
    api_deleteIncomeSubsidaryLedgerDetails: `${baseUrl}/api/finance/income-subsidiary-ledger/delete`,
    api_deleteIncomeSubsidaryLedgerDetailsByUniqueId: `${baseUrl}/api/finance/income-subsidiary-ledger/delete-byUniqueId`,
    api_forwardIncomeSubsidaryLedgerDetailsById: `${baseUrl}/api/finance/income-subsidiary-ledger/update-status`,
    api_forwardIncomeSubsidaryLedgerDetailsByUniqueId: `${baseUrl}/api/finance/income-subsidiary-ledger/update-status-byUniqueId`,


    ////////////////////////////////////////////////////////////
    ///////////////       VOUCHER Apis             //////////
    //////////////////////////////////////////////////////////

    // ════════════════════════════║  API Of Register For The Year Ended CRUD ║═════════════════════════════════
    api_getRegisterForTheYearEnded: `${baseUrl}/api/finance/deposit-register/getall`,
    api_postRegisterForTheYearEnded: `${baseUrl}/api/finance/deposit-register/create`,
    api_updateRegisterForTheYearEnded: `${baseUrl}/api/finance/deposit-register/update`,
    api_deleteRegisterForTheYearEnded: `${baseUrl}/api/finance/deposit-register/delete`,
    api_getRegisterForTheYearEndedById: `${baseUrl}/api/finance/deposit-register/getById`,
    api_forwardRegisterForTheYearEnded: `${baseUrl}/api/finance/deposit-register/forward`,
    // ════════════════════════════║  API Of Summary Statement Bills CRUD ║═════════════════════════════════
    api_getSummaryStatementBills: `${baseUrl}/api/finance/summary-statement-bill/getall`,
    api_postSummaryStatementBills: `${baseUrl}/api/finance/summary-statement-bill/create`,
    api_updateSummaryStatementBills: `${baseUrl}/api/finance/summary-statement-bill/update`,
    api_deleteSummaryStatementBills: `${baseUrl}/api/finance/summary-statement-bill/delete`,
    api_getSummaryStatementBillsById: `${baseUrl}/api/finance/summary-statement-bill/getById`,
    api_forwardSummaryStatementBills: `${baseUrl}/api/finance/summary-statement-bill/forward`,
    // ════════════════════════════║  API Of Statement Outstanding Liability CRUD ║═════════════════════════════════
    api_getStatementLiability: `${baseUrl}/api/finance/statement-outstanding-liability-expenses/getall`,
    api_postStatementLiability: `${baseUrl}/api/finance/statement-outstanding-liability-expenses/create`,
    api_updateStatementLiability: `${baseUrl}/api/finance/statement-outstanding-liability-expenses/update`,
    api_deleteStatementLiability: `${baseUrl}/api/finance/statement-outstanding-liability-expenses/delete`,
    api_getStatementLiabilityById: `${baseUrl}/api/finance/statement-outstanding-liability-expenses/getById`,
    api_forwardStatementLiability: `${baseUrl}/api/finance/statement-outstanding-liability-expenses/forward`,
    // ════════════════════════════║  API Of Register Of notice fee CRUD ║═════════════════════════════════
    api_getRegisterNoticeFee: `${baseUrl}/api/finance/register-notice-fee/getall`,
    api_postRegisterNoticeFee: `${baseUrl}/api/finance/register-notice-fee/create`,
    api_updateRegisterNoticeFee: `${baseUrl}/api/finance/register-notice-fee/update`,
    api_deleteRegisterNoticeFee: `${baseUrl}/api/finance/register-notice-fee/delete`,
    api_getRegisterNoticeFeeById: `${baseUrl}/api/finance/register-notice-fee/getById`,
    api_forwardRegisterNoticeFee: `${baseUrl}/api/finance/register-notice-fee/forward`,

    // ════════════════════════════║  API Of Register Of notice fee CRUD ║═════════════════════════════════


    api_postSummaryRegisterNoticeFee: `${baseUrl}/api/finance/summary-notice-fee/create`,

    api_getCashBankReceiptVoucherDraftData: `${baseUrl}/api/finance/summary-notice-fee/getall`,



    // ════════════════════════════║  API Of Register Of notice fee CRUD ║═════════════════════════════════

    api_getSummaryStatementOfWriteOffsDraftData: `${baseUrl}/api/finance/summary-notice-fee/getall`,
    api_postSummaryStatementOfWriteOffs: `${baseUrl}/api/finance/summary-notice-fee/create`,
    // api_getSummaryStatementOfWriteOffs :`${baseUrl}/api/finance/summary-notice-fee/getall`,
    


    // ════════════════════════════║  API Of Register Movable Holding Record CRUD ║═════════════════════════════════
    api_getRegisterMovableHoldingRecord: `${baseUrl}/api/finance/register-movable-holding/getall`,
    api_postRegisterMovableHoldingRecord: `${baseUrl}/api/finance/register-movable-holding/create`,
    api_updateRegisterMovableHoldingRecord: `${baseUrl}/api/finance/register-movable-holding/update`,
    api_deleteRegisterMovableHoldingRecord: `${baseUrl}/api/finance/register-movable-holding/delete`,
    api_getRegisterMovableHoldingRecordById: `${baseUrl}/api/finance/register-movable-holding/getById`,
    api_forwardRegisterMovableHoldingRecord: `${baseUrl}/api/finance/register-movable-holding/forward`,

    // ════════════════════════════║  API Of Master Data Of GenEntries  ║═════════════════════════════════
    api_masterDataOfGenEntries: `${baseUrl}/api/finance/master-genEntries/get`,   

    // ════════════════════════════║  API Of cashbank payment For║═════════════════════════════════
    api_postCashBankPaymentVoucher: `${baseUrl}/api/finance/cashbank-payment/create`,
    api_getCashBankPaymentVoucherData: `${baseUrl}/api/finance/cashbank-payment/getall`,
    api_getCashBankPaymentVoucherById: `${baseUrl}/api/finance/cashbank-payment/getById`,
    api_getCashBankPaymentVoucherByUniqueId: `${baseUrl}/api/finance/cashbank-payment/uniqueId`,
    api_updateCashBankPaymentVoucher: `${baseUrl}/api/finance/cashbank-payment/update`,
    api_forwardCashBankPaymentVoucher: `${baseUrl}/api/finance/cashbank-payment/forward`,
    api_updateCashBankPaymentVoucherByUnique: `${baseUrl}/api/finance/cashbank-payment/updateByUniqueId`,
    api_forwardCashBankPaymentByUniqueId: `${baseUrl}/api/finance/cashbank-payment/forwardUniqueId`,
    api_deleteCashBankPaymentVoucher: `${baseUrl}/api/finance/cashbank-payment/delete`,

    // ════════════════════════════║  API Of cashbank receipt For║═════════════════════════════════
    api_postCashBankRecieptVoucher: `${baseUrl}/api/finance/cashbank-receipt/create`,
    api_getCashBankReceiptVoucherData: `${baseUrl}/api/finance/cashbank-receipt/getall`,
    api_getCashBankRecieptVoucherById: `${baseUrl}/api/finance/cashbank-receipt/getById`,
    api_getCashBankReceiptVoucherByUniqueId: `${baseUrl}/api/finance/cashbank-receipt/uniqueId`,
    api_updateCashBankRecieptVoucher: `${baseUrl}/api/finance/cashbank-receipt/update`,
    api_updateCashBankReceiptVoucherByUnique: `${baseUrl}/api/finance/cashbank-receipt/updateByUniqueId`,
    api_forwardCashBankRecieptVoucher: `${baseUrl}/api/finance/cashbank-receipt/forward`,
    api_forwardCashBankReceiptByUniqueId: `${baseUrl}/api/finance/cashbank-receipt/forwardUniqueId`,
    api_deleteCashBankRecieptVoucher: `${baseUrl}/api/finance/cashbank-receipt/delete`,

    // ════════════════════════════║  API Of register-of-bills-payment For║═════════════════════════════════
    api_postRegisterOfPayment: `${baseUrl}/api/finance/register-of-bills-payment/create`,
    api_getRegisterOfPayment: `${baseUrl}/api/finance/register-of-bills-payment/get-all`,
    api_getRegisterOfPaymentById: `${baseUrl}/api/finance/register-of-bills-payment/get-by-id`,
    api_updateRegisterOfPaymentById: `${baseUrl}/api/finance/register-of-bills-payment/update-by-id`,
    api_deleteRegisterOfPaymentById: `${baseUrl}/api/finance/register-of-bills-payment/delete-by-id`,

    // ════════════════════════════║  API Of Payment Order Voucher For║═════════════════════════════════
    api_postpaymentOrder: `${baseUrl}/api/finance/payment-order/create`,
    api_getpaymentOrder: `${baseUrl}/api/finance/payment-order/get`,
    api_getpaymentOrderById: `${baseUrl}/api/finance/payment-order/get-by-id`,
    api_updatepaymentOrderById: `${baseUrl}/api/finance/payment-order/update-by-id`,
    api_deletepaymentOrderById: `${baseUrl}/api/finance/payment-order/delete-by-id`,


    //-----------------------------------||bank master ||---------------------------------------------------

    api_bankCreate: `${baseUrl}/api/finance/bank-master/create`,
    api_bankGet: `${baseUrl}/api/finance/bank-master/get`,
    api_bankGetById: `${baseUrl}/api/finance/bank-master/get-by-id`,
    api_bankUpdateById: `${baseUrl}/api/finance/bank-master/update`,

    //-----------------------------------||bank account master ||---------------------------------------------------

    api_bankAccountCreate: `${baseUrl}/api/finance/bank-account/create`,
    api_bankAccountGet: `${baseUrl}/api/finance/bank-account/get`,
    api_bankAccountGetById: `${baseUrl}/api/finance/bank-account/get-by-id`,
    api_bankAccountUpdateById: `${baseUrl}/api/finance/bank-account/update-by-id`,

    //-----------------------------------||branch master ||---------------------------------------------------

    api_bankBranchCreate: `${baseUrl}/api/finance/branch/create`,
    api_bankBranchGet: `${baseUrl}/api/finance/branch/get`,
    api_bankBranchGetById: `${baseUrl}/api/finance/branch/get-by-id`,
    api_bankBranchUpdateById: `${baseUrl}/api/finance/branch/update-by-id`,

    //-----------------------------------||scheme master ||---------------------------------------------------

    api_schemeCreate: `${baseUrl}/api/finance/schemes/create`,
    api_schemeGet: `${baseUrl}/api/finance/schemes/get`,
    api_schemeGetById: `${baseUrl}/api/finance/schemes/get-by-id`,
    api_schemeUpdateById: `${baseUrl}/api/finance/schemes/update-by-id`,

    //-----------------------------------||sub-scheme master ||---------------------------------------------------

    api_subSchemeCreate: `${baseUrl}/api/finance/sub-schemes/create`,
    api_subSchemeGet: `${baseUrl}/api/finance/sub-schemes/get`,
    api_subSchemeGetById: `${baseUrl}/api/finance/sub-schemes/get-by-id`,
    api_subSchemeUpdateById: `${baseUrl}/api/finance/sub-schemes/update-by-id`,

    //-----------------------------------||scheme details from f-commission ||---------------------------------------------------

    api_fcommissionSchemeGet: `${baseUrl}/api/sudafc/schemes`,


    // api_saveDraftCashBankReceiptVoucherDraftData: `${baseUrl}/api/finance/cashbank-receipt/save-draft-cash-bank-receipt-voucher`, 
    api_saveBackwordForwardCashBankReceiptVoucherData: `${baseUrl}/api/finance/cashbank-receipt/backword-forward-cash-bank-receipt-voucher`,

    // ════════════════════════════║  API Of cashbank payment For║═════════════════════════════════
    // api_postCashBankPaymentVoucher: `${baseUrl}/api/finance/cashbank-payment/create-cashbank-payment`,
    api_getCashBankPaymentVoucherDataRoleWise: `${baseUrl}/api/finance/cashbank-payment/getall-listing-cash-bank-payment-voucher`,
    api_getCashBankPaymentVoucherDraftData: `${baseUrl}/api/finance/cashbank-payment/getall-listing-draft-cash-bank-payment-voucher`,
    api_saveDraftCashBankPaymentVoucherDraftData: `${baseUrl}/api/finance/cashbank-payment/save-draft-cash-bank-payment-voucher`,
    api_getBackwordForwardCashBankPaymentVoucherData: `${baseUrl}/api/finance/cashbank-payment/backword-forward-cash-bank-payment-voucher`,

    // ════════════════════════════║  API Of Contra Voucher For║═════════════════════════════════
    api_postContraVoucher: `${baseUrl}/api/finance/contra-voucher/create-contra-voucher`,
    api_getContraVoucherDataRoleWise: `${baseUrl}/api/finance/contra-voucher/getall-listing-contra-voucher`,
    api_getContraVoucherDraftData: `${baseUrl}/api/finance/contra-voucher/getall-listing-draft-contra-voucher`,
    api_saveDraftContraVoucherDraftData: `${baseUrl}/api/finance/contra-voucher/save-draft-contra-voucher`,
    api_getBackwordForwardContraVoucherData: `${baseUrl}/api/finance/contra-voucher/backword-forward-contra-voucher`,

    // ════════════════════════════║  API Of Journal Voucher For║═════════════════════════════════
    api_postJournalVoucher: `${baseUrl}/api/finance/journal-voucher/create-journal-voucher`,
    api_getJournalVoucherDataRoleWise: `${baseUrl}/api/finance/journal-voucher/getall-listing-journal-voucher`,
    api_getJournalVoucherDraftData: `${baseUrl}/api/finance/journal-voucher/getall-listing-draft-journal-voucher`,
    api_saveDraftJournalVoucherDraftData: `${baseUrl}/api/finance/journal-voucher/save-draft-journal-voucher`,
    api_getBackwordForwardJournalVoucherData: `${baseUrl}/api/finance/journal-voucher/backword-forward-journal-voucher`,

    // ════════════════════════════║  API Of Receipt For║═════════════════════════════════
    api_postReceipt: `${baseUrl}/api/finance/receipt/create-receipt`,
    api_getReceiptDataRoleWise: `${baseUrl}/api/finance/receipt/getall-listing-receipt`,
    api_geReceiptrDraftData: `${baseUrl}/api/finance/receipt/getall-listing-draft-receipt`,
    api_saveDraftReceiptDraftData: `${baseUrl}/api/finance/receipt/save-draft-receipt`,
    api_getBackwordForwardReceiptData: `${baseUrl}/api/finance/receipt/backword-forward-receipt`,

    //-----------------------------------||vendor master ||---------------------------------------------------

    api_vendorCreate: `${baseUrl}/api/finance/vendor-master/create`,
    api_vendorGet: `${baseUrl}/api/finance/vendor-master/get`,
    api_vendorGetById: `${baseUrl}/api/finance/vendor-master/get-by-id`,
    api_vendorUpdateById: `${baseUrl}/api/finance/vendor-master/update-by-id`,

    //-----------------------------------||supplier master ||---------------------------------------------------

    api_supplierCreate: `${baseUrl}/api/finance/suppliers/create`,
    api_supplierGet: `${baseUrl}/api/finance/suppliers/get`,
    api_supplierGetById: `${baseUrl}/api/finance/suppliers/get-by-id`,
    api_supplierUpdateById: `${baseUrl}/api/finance/suppliers/update-by-id`,


    api_SubledgerCreate: `${baseUrl}/api/finance/subledger-master/create`,
    api_SubledgerGet: `${baseUrl}/api/finance/subledger-master/get`,
    api_SubledgerGetById: `${baseUrl}/api/finance/subledger-master/get-by-id`,
    api_SubledgerUpdateById: `${baseUrl}/api/finance/subledger-master/update-by-id`,

    //-----------------------------------||Refund And Remissions ||---------------------------------------------------


    api_postRefundAndRemissions: `${baseUrl}/api/finance/summary-refund-remission/createsummary-refund-remission`,
    api_deleteRefundAndRemissions: `${baseUrl}/api/finance/summary-refund-remission/delete`,
    api_getRefundAndRemissions: `${baseUrl}/api/finance/summary-refund-remission/getall`,
    api_getRefundAndRemissionsById: `${baseUrl}/api/finance/summary-refund-remission/getById`,
    api_updateRefundAndRemissions: `${baseUrl}/api/finance/summary-refund-remission/update`,
    api_getRefundAndRemissionsDraftData: `${baseUrl}/api/finance/summary-refund-remission/getall-refund-remissions-draft`,
    api_forwardRefundAndRemissions: `${baseUrl}/api/finance/summary-refund-remission/forward`,
    // -----------------------------|| Master Gen Entries || -------------------------------
    api_genEntriesCreate: `${baseUrl}/api/finance/master-genEntries/create`,
    // api_getGenEntriesMaster: `${baseUrl}/api/finance/master-genEntries/get`,
    api_genEntriesGet: `${baseUrl}/api/finance/master-genEntries/getAll`,
    api_genEntriesGetById: `${baseUrl}/api/finance/master-genEntries/getById`,
    api_genEntriesUpdateById: `${baseUrl}/api/finance/master-genEntries/update`,


    //-----------------------------------||Subledger catogary master ||---------------------------------------------------

    api_SubledgerCategoriesCreate: `${baseUrl}/api/finance/subledger-categories/create`,
    api_SubledgerCategoriesGet: `${baseUrl}/api/finance/subledger-categories/get`,
    api_SubledgerCategoriesGetById: `${baseUrl}/api/finance/subledger-categories/get-by-id`,
    api_SubledgerCategoriesUpdateById: `${baseUrl}/api/finance/subledger-categories/update-by-id`,


    //-----------------------------------||chequebook entries master ||---------------------------------------------------

    api_chequebookCreate: `${baseUrl}/api/finance/cheque-book-entries/create`,
    api_chequebookGet: `${baseUrl}/api/finance/cheque-book-entries/get`,
    api_chequebookGetById: `${baseUrl}/api/finance/cheque-book-entries/get-by-id`,
    api_chequebookUpdateById: `${baseUrl}/api/finance/cheque-book-entries/update-by-id`,


    //-----------------------------------||contractor master ||---------------------------------------------------

    api_contractorCreate: `${baseUrl}/api/finance/contractors/create`,
    api_contractorGet: `${baseUrl}/api/finance/contractors/get`,
    api_contractorGetById: `${baseUrl}/api/finance/contractors/get-by-id`,
    api_contractorUpdateById: `${baseUrl}/api/finance/contractors/update-by-id`,


    //-----------------------------------||opening-balance master ||---------------------------------------------------
    
    api_suppliersContractorsGet: `${baseUrl}/api/finance/suppliers-contractors/get`,
    api_openingBalanceCreate: `${baseUrl}/api/finance/opening-balance/create`,
    api_openingBalanceGet: `${baseUrl}/api/finance/opening-balance/get`,
    api_openingBalanceGetById: `${baseUrl}/api/finance/opening-balance/get-by-id`,
    api_openingBalanceUpdateById: `${baseUrl}/api/finance/opening-balance/update-by-id`,


    //-----------------------------------||fund-master ||---------------------------------------------------

    api_fundsCreate: `${baseUrl}/api/finance/funds/create`,
    api_fundsGet: `${baseUrl}/api/finance/funds/get`,
    api_fundsGetById: `${baseUrl}/api/finance/funds/get-by-id`,
    api_fundsUpdateById: `${baseUrl}/api/finance/funds/update-by-id`,

    //-----------------------------------||function-master ||---------------------------------------------------

    api_functionsCreate: `${baseUrl}/api/finance/functions/create`,
    api_functionsGet: `${baseUrl}/api/finance/functions/get`,
    api_functionsGetById: `${baseUrl}/api/finance/functions/get-by-id`,
    api_functionsUpdateById: `${baseUrl}/api/finance/functions/update-by-id`,

    //-----------------------------------||deduction-master ||---------------------------------------------------

    api_deductionsCreate: `${baseUrl}/api/finance/deductions/create`,
    api_deductionsGet: `${baseUrl}/api/finance/deductions/get`,
    api_deductionsGetById: `${baseUrl}/api/finance/deductions/get-by-id`,
    api_deductionsUpdateById: `${baseUrl}/api/finance/deductions/update-by-id`,


    //--------------------ULB MASTERS--------------------------------------
    api_getAllUlb:`${baseUrl}/api/get-all-ulb`,

    //--------------------DEPARTMENT MASTERS--------------------------------------
    api_getDepartment:`${baseUrl}/api/hrms/v1/master/department`
  };

  return apiList;
}
