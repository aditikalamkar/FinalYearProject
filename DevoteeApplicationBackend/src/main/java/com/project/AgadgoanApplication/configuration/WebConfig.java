package com.project.AgadgoanApplication.configuration;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://engineeringprojectsdemo.com","http://54.90.90.19")
            .allowedMethods("*")
            .allowCredentials(true)
            .allowedHeaders("*");
    }
}

