/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controllers;

import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author lakshan
 */
@javax.ws.rs.ApplicationPath("api")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    /**
     * Do not modify addRestResourceClasses() method.
     * It is automatically populated with
     * all resources defined in the project.
     * If required, comment out calling this method in getClasses().
     */
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(Controllers.BankAccountResource.class);
        resources.add(Controllers.BrokerResource.class);
        resources.add(Controllers.SectorResource.class);
        resources.add(Controllers.StockResource.class);
        resources.add(Controllers.StockTransactionResource.class);
        resources.add(Controllers.TurnResource.class);
    }
    
}
