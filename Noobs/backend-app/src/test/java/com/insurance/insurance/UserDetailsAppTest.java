//package com.insurance.insurance;
//
//import com.insurance.insurance.app.userdetails.UserDetailsAppService;
//import com.insurance.insurance.app.userdetails.UserDetailsController;
//import com.insurance.insurance.domain.predictionclass.PredictionClass;
//import com.insurance.insurance.domain.predictionclass.PredictionClassRepository;
//import com.insurance.insurance.domain.reading.Reading;
//import com.insurance.insurance.domain.trip.TripRepository;
//import com.insurance.insurance.domain.user.User;
//import com.insurance.insurance.domain.user.UserRepository;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.event.annotation.BeforeTestExecution;
//import org.springframework.test.context.jdbc.Sql;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static com.google.common.collect.Lists.newArrayList;
//
//@RunWith(SpringRunner.class)
//@DataJpaTest
//@SpringBootTest
//@AutoConfigureMockMvc
//public class UserDetailsAppTest {
//
//    @Autowired
//    private UserRepository userRepository;
//    @Autowired
//    private TripRepository tripRepository;
//    @Autowired
//    private PredictionClassRepository predictionClassRepository;
//
//    @Autowired
//    private UserDetailsAppService userDetailsAppService;
//
//    @Test
//    @Transactional
//    public void shouldCorrectlyReturnPredictionClasses() {
//
//        User user = userRepository.save(new User())
//
//        PredictionClass predictionClass1 = new PredictionClass("a", "aa");
//        PredictionClass predictionClass2 = new PredictionClass("b", "bb");
//        PredictionClass predictionClass3 = new PredictionClass("c", "cc");
//
//        Reading reading1 = new Reading()
//
//    }
//
//
//}
