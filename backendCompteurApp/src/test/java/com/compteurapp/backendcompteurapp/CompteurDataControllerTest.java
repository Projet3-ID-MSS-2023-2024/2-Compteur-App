package com.compteurapp.backendcompteurapp;

import static org.mockito.Mockito.*;

import com.compteurapp.backendcompteurapp.controller.CompteurDataController;
import com.compteurapp.backendcompteurapp.model.CompteurData;
import com.compteurapp.backendcompteurapp.repository.CompteurDataRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.ArrayList;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class CompteurDataControllerTest {

    private MockMvc mockMvc;

    @InjectMocks
    private CompteurDataController compteurDataController;

    @Mock
    private CompteurDataRepository compteurDataRepository;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindCompteurDataSize() {
        List<CompteurData> list = new ArrayList<>();

        CompteurData compteurData = new CompteurData();
        compteurData.setPhoto("photo");
        compteurData.setClient(1L);
        compteurData.setVendeur(1L);
        compteurData.setValeur(100.0);

        list.add(compteurData);
        Pageable pageable = PageRequest.of(0, 1);

        Page<CompteurData> page = new PageImpl<>(list, pageable, list.size());
        when(compteurDataRepository.findByClient(1L, pageable)).thenReturn(page);

        Page<CompteurData> empPage = compteurDataRepository.findByClient(1L, pageable);
        assertEquals(1, empPage.getContent().size());
    }

    @Test
    void testFindCompteurDataValues() {
        List<CompteurData> list = new ArrayList<>();

        CompteurData compteurData = new CompteurData();
        compteurData.setPhoto("photo");
        compteurData.setClient(1L);
        compteurData.setVendeur(1L);
        compteurData.setValeur(100.0);

        list.add(compteurData);
        Pageable pageable = PageRequest.of(0, 1);

        Page<CompteurData> page = new PageImpl<>(list, pageable, list.size());
        when(compteurDataRepository.findByClient(1L, pageable)).thenReturn(page);

        Page<CompteurData> empPage = compteurDataRepository.findByClient(1L, pageable);
        assertEquals(1, empPage.getContent().size());
        CompteurData actual = empPage.getContent().get(0);
        assertEquals(100.0, actual.getValeur(), 0.001);
        assertEquals("photo",actual.getPhoto());
    }

    @Test
    void testFindCompteurWithBadValues() {
        List<CompteurData> list = new ArrayList<>();

        CompteurData compteurData = new CompteurData();
        compteurData.setPhoto("photo");
        compteurData.setClient(1L);
        compteurData.setVendeur(1L);
        compteurData.setValeur(-100.0);

        list.add(compteurData);
        Pageable pageable = PageRequest.of(0, 1);

        Page<CompteurData> page = new PageImpl<>(list, pageable, list.size());
        when(compteurDataRepository.findByClient(1L, pageable)).thenReturn(page);

        Page<CompteurData> empPage = compteurDataRepository.findByClient(1L, pageable);
        assertEquals(1, empPage.getContent().size());
        CompteurData actual = empPage.getContent().get(0);
        assertEquals(-100.0, actual.getValeur(), 0.001);
    }



}
