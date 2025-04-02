import { createContext, useState, useEffect } from "react";
import axios from "axios";
import API from "../API's/AuthAPI";

const OrganizationContext = createContext();

export const OrganizationProvider = ({ children }) => {
    const [organization, setOrganization] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchOrganization = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;
                
                const response = await axios.get(`${API}/organization/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setOrganization(response.data);
            } catch (error) {
                console.error("Error fetching organization profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrganization();
    }, []);

    return (
        <OrganizationContext.Provider value={{ organization, setOrganization, loading }}>
            {children}
        </OrganizationContext.Provider>
    );
};

export default OrganizationContext;
