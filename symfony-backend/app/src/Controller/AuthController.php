<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Company;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/auth')]
class AuthController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private UserPasswordHasherInterface $passwordHasher;
    private ValidatorInterface $validator;

    public function __construct(
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
        ValidatorInterface $validator
    ) {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
        $this->validator = $validator;
    }

    #[Route('/register/user', name: 'api_register_user', methods: ['POST'])]
    public function registerUser(Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            // Validar que se recibieron los datos necesarios
            $requiredFields = ['email', 'password', 'firstName', 'lastName'];
            foreach ($requiredFields as $field) {
                if (empty($data[$field])) {
                    return $this->json([
                        'success' => false,
                        'message' => "El campo '{$field}' es obligatorio"
                    ], 400);
                }
            }

            // Verificar si el email ya existe
            $existingUser = $this->entityManager->getRepository(User::class)
                ->findOneBy(['email' => $data['email']]);
            
            $existingCompany = $this->entityManager->getRepository(Company::class)
                ->findOneBy(['email' => $data['email']]);

            if ($existingUser || $existingCompany) {
                return $this->json([
                    'success' => false,
                    'message' => 'Este email ya está registrado'
                ], 409);
            }

            // Crear nuevo usuario
            $user = new User();
            $user->setEmail($data['email']);
            $user->setFirstName($data['firstName']);
            $user->setLastName($data['lastName']);
            
            if (isset($data['phone'])) {
                $user->setPhone($data['phone']);
            }

            // Hash de la contraseña
            $hashedPassword = $this->passwordHasher->hashPassword($user, $data['password']);
            $user->setPassword($hashedPassword);

            // Validar la entidad
            $errors = $this->validator->validate($user);
            if (count($errors) > 0) {
                $errorMessages = [];
                foreach ($errors as $error) {
                    $errorMessages[] = $error->getMessage();
                }
                return $this->json([
                    'success' => false,
                    'message' => 'Errores de validación',
                    'errors' => $errorMessages
                ], 400);
            }

            // Guardar en la base de datos
            $this->entityManager->persist($user);
            $this->entityManager->flush();

            return $this->json([
                'success' => true,
                'message' => 'Usuario registrado exitosamente',
                'user' => [
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'firstName' => $user->getFirstName(),
                    'lastName' => $user->getLastName(),
                    'phone' => $user->getPhone(),
                    'createdAt' => $user->getCreatedAt()->format('d/m/Y H:i')
                ]
            ], 201);

        } catch (\Exception $e) {
            return $this->json([
                'success' => false,
                'message' => 'Error interno del servidor',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    #[Route('/register/company', name: 'api_register_company', methods: ['POST'])]
    public function registerCompany(Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            // Validar que se recibieron los datos necesarios
            $requiredFields = ['email', 'password', 'companyName', 'taxId'];
            foreach ($requiredFields as $field) {
                if (empty($data[$field])) {
                    return $this->json([
                        'success' => false,
                        'message' => "El campo '{$field}' es obligatorio"
                    ], 400);
                }
            }

            // Verificar si el email ya existe
            $existingUser = $this->entityManager->getRepository(User::class)
                ->findOneBy(['email' => $data['email']]);
            
            $existingCompany = $this->entityManager->getRepository(Company::class)
                ->findOneBy(['email' => $data['email']]);

            if ($existingUser || $existingCompany) {
                return $this->json([
                    'success' => false,
                    'message' => 'Este email ya está registrado'
                ], 409);
            }

            // Verificar si el CIF/NIF ya existe
            $existingTaxId = $this->entityManager->getRepository(Company::class)
                ->findOneBy(['taxId' => $data['taxId']]);

            if ($existingTaxId) {
                return $this->json([
                    'success' => false,
                    'message' => 'Este CIF/NIF ya está registrado'
                ], 409);
            }

            // Crear nueva empresa
            $company = new Company();
            $company->setEmail($data['email']);
            $company->setCompanyName($data['companyName']);
            $company->setTaxId($data['taxId']);

            // Campos opcionales
            if (isset($data['address'])) $company->setAddress($data['address']);
            if (isset($data['city'])) $company->setCity($data['city']);
            if (isset($data['postalCode'])) $company->setPostalCode($data['postalCode']);
            if (isset($data['country'])) $company->setCountry($data['country']);
            if (isset($data['phone'])) $company->setPhone($data['phone']);
            if (isset($data['website'])) $company->setWebsite($data['website']);
            if (isset($data['description'])) $company->setDescription($data['description']);
            if (isset($data['sector'])) $company->setSector($data['sector']);
            if (isset($data['employeeCount'])) $company->setEmployeeCount($data['employeeCount']);

            // Hash de la contraseña
            $hashedPassword = $this->passwordHasher->hashPassword($company, $data['password']);
            $company->setPassword($hashedPassword);

            // Validar la entidad
            $errors = $this->validator->validate($company);
            if (count($errors) > 0) {
                $errorMessages = [];
                foreach ($errors as $error) {
                    $errorMessages[] = $error->getMessage();
                }
                return $this->json([
                    'success' => false,
                    'message' => 'Errores de validación',
                    'errors' => $errorMessages
                ], 400);
            }

            // Guardar en la base de datos
            $this->entityManager->persist($company);
            $this->entityManager->flush();

            return $this->json([
                'success' => true,
                'message' => 'Empresa registrada exitosamente',
                'company' => [
                    'id' => $company->getId(),
                    'email' => $company->getEmail(),
                    'companyName' => $company->getCompanyName(),
                    'taxId' => $company->getTaxId(),
                    'address' => $company->getAddress(),
                    'city' => $company->getCity(),
                    'phone' => $company->getPhone(),
                    'website' => $company->getWebsite(),
                    'sector' => $company->getSector(),
                    'isVerified' => $company->getIsVerified(),
                    'createdAt' => $company->getCreatedAt()->format('d/m/Y H:i')
                ]
            ], 201);

        } catch (\Exception $e) {
            return $this->json([
                'success' => false,
                'message' => 'Error interno del servidor',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    #[Route('/login', name: 'api_login', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            if (empty($data['email']) || empty($data['password'])) {
                return $this->json([
                    'success' => false,
                    'message' => 'Email y contraseña son obligatorios'
                ], 400);
            }

            // Buscar usuario
            $user = $this->entityManager->getRepository(User::class)
                ->findOneBy(['email' => $data['email']]);

            // Si no es usuario, buscar empresa
            if (!$user) {
                $user = $this->entityManager->getRepository(Company::class)
                    ->findOneBy(['email' => $data['email']]);
            }

            if (!$user) {
                return $this->json([
                    'success' => false,
                    'message' => 'Credenciales incorrectas'
                ], 401);
            }

            // Verificar contraseña
            if (!$this->passwordHasher->isPasswordValid($user, $data['password'])) {
                return $this->json([
                    'success' => false,
                    'message' => 'Credenciales incorrectas'
                ], 401);
            }

            // Verificar si está activo
            if (!$user->getIsActive()) {
                return $this->json([
                    'success' => false,
                    'message' => 'Cuenta desactivada'
                ], 403);
            }

            // Preparar respuesta según el tipo
            $userType = $user instanceof User ? 'user' : 'company';
            $userData = [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'type' => $userType,
                'roles' => $user->getRoles()
            ];

            if ($userType === 'user') {
                $userData['firstName'] = $user->getFirstName();
                $userData['lastName'] = $user->getLastName();
                $userData['fullName'] = $user->getFullName();
            } else {
                $userData['companyName'] = $user->getCompanyName();
                $userData['taxId'] = $user->getTaxId();
                $userData['isVerified'] = $user->getIsVerified();
            }

            return $this->json([
                'success' => true,
                'message' => 'Login exitoso',
                'user' => $userData
            ]);

        } catch (\Exception $e) {
            return $this->json([
                'success' => false,
                'message' => 'Error interno del servidor',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}