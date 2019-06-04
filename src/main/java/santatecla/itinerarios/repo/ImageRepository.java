package santatecla.itinerarios.repo;

import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import santatecla.itinerarios.model.Image;

@RepositoryRestResource
public interface ImageRepository extends JpaRepository<Image, Image.ImageId> {
    Optional<Image> findById_FilenameAndId_Form_Id(String filename, Long form_id);

    @Transactional
    Set<Image> findById_Form_Id(Long id);
}
