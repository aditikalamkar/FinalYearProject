package com.project.AgadgoanApplication.configuration;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:4200","http://engineeringprojectsdemo.com","http://52.91.88.239")
            .allowedMethods("*")
            .allowCredentials(true)
            .allowedHeaders("*");
    }
}

