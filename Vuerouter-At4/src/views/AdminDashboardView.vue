<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-indigo-50 border border-indigo-100 p-6 rounded-xl flex items-center justify-between">
         <div>
             <div class="text-sm font-semibold text-indigo-600 mb-1">Vendas Hoje</div>
             <div class="text-3xl font-black text-indigo-900">R$ 1.240,00</div>
         </div>
         <i class="pi pi-dollar text-4xl text-indigo-300"></i>
      </div>
      <div class="bg-emerald-50 border border-emerald-100 p-6 rounded-xl flex items-center justify-between">
         <div>
             <div class="text-sm font-semibold text-emerald-600 mb-1">Pedidos</div>
             <div class="text-3xl font-black text-emerald-900">32</div>
         </div>
         <i class="pi pi-shopping-bag text-4xl text-emerald-300"></i>
      </div>
      <div class="bg-amber-50 border border-amber-100 p-6 rounded-xl flex items-center justify-between">
         <div>
             <div class="text-sm font-semibold text-amber-600 mb-1">Visitantes</div>
             <div class="text-3xl font-black text-amber-900">450</div>
         </div>
         <i class="pi pi-users text-4xl text-amber-300"></i>
      </div>
    </div>
    
    <div class="bg-white border border-slate-200 rounded-xl overflow-hidden mt-8 shadow-sm">
        <div class="p-6 border-b border-slate-100">
            <h3 class="font-bold text-slate-800">Últimos Pedidos</h3>
        </div>
        <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 text-slate-500">
                <tr>
                    <th class="p-4 font-semibold">Id do Pedido</th>
                    <th class="p-4 font-semibold">Cliente</th>
                    <th class="p-4 font-semibold">Data</th>
                    <th class="p-4 font-semibold">Status</th>
                    <th class="p-4 font-semibold">Total</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
                <tr>
                   <td class="p-4">#ORD-001</td>
                   <td class="p-4">João Silva</td>
                   <td class="p-4">Hoje, 14:30</td>
                   <td class="p-4"><span class="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-bold">Concluído</span></td>
                   <td class="p-4">R$ 249,90</td>
                </tr>
                <tr>
                   <td class="p-4">#ORD-002</td>
                   <td class="p-4">Maria Oliveira</td>
                   <td class="p-4">Hoje, 10:15</td>
                   <td class="p-4"><span class="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-bold">Pendente</span></td>
                   <td class="p-4">R$ 699,00</td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>
