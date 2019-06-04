package santatecla.itinerarios.service;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import santatecla.itinerarios.model.Form;
import santatecla.itinerarios.repo.FormRepository;

@Service
public class FileService {
    private FormRepository repository;

    public FileService(FormRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public Page<Form> findAllByUnit_Id(Long id, Pageable page) {
        return this.repository.findAllByUnit_Id(id, page);
    }
}
