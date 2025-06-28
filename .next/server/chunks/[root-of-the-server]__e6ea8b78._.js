module.exports = {

"[project]/.next-internal/server/app/api/order-items/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/@opentelemetry/api [external] (@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("@opentelemetry/api", () => require("@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/app/api/order-items/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// src/app/api/order-items/route.ts
__turbopack_context__.s({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
async function GET(req) {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');
    console.log('Fetching order items for orderId:', orderId);
    const mockOrders = {
        '123': {
            items: [
                {
                    name: 'Curso de Inglês Social',
                    quantity: 1,
                    price: 2000,
                    image: 'https://socialidiomas.com.br/site/wp-content/uploads/2021/05/curso-de-ingles-social.jpg'
                },
                {
                    name: 'Casa de Árvore',
                    quantity: 2,
                    price: 1000,
                    image: 'https://cdn.awsli.com.br/600x700/1278/1278944/produto/259777355/arvore-0u1otlzanj.jpg'
                }
            ],
            tax: 0,
            subtotal: 4000,
            iva: 800,
            total: 4800
        },
        '456': {
            items: [
                {
                    name: 'E-book Programação',
                    quantity: 3,
                    price: 500,
                    image: 'https://m.media-amazon.com/images/I/61u7T1koQqL._SL1500_.jpg'
                }
            ],
            tax: 0,
            subtotal: 1500,
            iva: 300,
            total: 1800
        },
        '789': {
            items: [
                {
                    name: 'Placa Solar 500W',
                    quantity: 1,
                    price: 7500,
                    image: 'https://www.solardireto.pt/media/catalog/product/cache/1/image/600x700/0dc2d03fe217f8c83829496872af24a0/p/l/placa-solar-monocristalina-500w.jpg'
                },
                {
                    name: 'Controlador de Carga MPPT',
                    quantity: 1,
                    price: 3000,
                    image: 'https://cdn.awsli.com.br/600x700/1000/1000360/produto/134487131/3efcb38fc3.jpg'
                }
            ],
            tax: 0,
            subtotal: 10500,
            iva: 2100,
            total: 12600
        }
    };
    const order = mockOrders[orderId];
    if (!order) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Pedido não encontrado.'
        }, {
            status: 404
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(order);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__e6ea8b78._.js.map