import { useState } from "react";

import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";

import DashboardHome from "../../components/dashboard/DashboardHome";
import DashboardProducts from "../../components/dashboard/DashboardProducts";
import DashboardOffers from "../../components/dashboard/DashboardOffers";
import DashboardGallery from "../../components/dashboard/DashboardGallery";
import DashboardReviews from "../../components/dashboard/DashboardReviews";
import DashboardAnalytics from "../../components/dashboard/DashboardAnalytics";
import DashboardSettings from "../../components/dashboard/DashboardSettings";

function BusinessDashboard() {

    const [activeTab, setActiveTab] =
        useState("overview");

    return (

        <div className="min-h-screen bg-slate-100">

            <DashboardNavbar />

            <div className="flex">

                <DashboardSidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                <main className="flex-1 p-8">

                    {activeTab === "overview" && (
                        <DashboardHome />
                    )}

                    {activeTab === "products" && (
                        <DashboardProducts />
                    )}

                    {activeTab === "offers" && (
                        <DashboardOffers />
                    )}

                    {activeTab === "gallery" && (
                        <DashboardGallery />
                    )}

                    {activeTab === "reviews" && (
                        <DashboardReviews />
                    )}

                    {activeTab === "analytics" && (
                        <DashboardAnalytics />
                    )}

                    {activeTab === "settings" && (
                        <DashboardSettings />
                    )}

                </main>

            </div>

        </div>

    );

}

export default BusinessDashboard;